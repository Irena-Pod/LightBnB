const properties = require('./json/properties.json');
const users = require('./json/users.json');

const { Pool } = require('pg');

const pool = new Pool({
  user: 'vagrant',
  password: '123',
  host: 'localhost',
  database: 'lightbnb'
});

/// Users

/**
 * Get a single user from the database given their email.
 * @param {String} email The email of the user.
 * @return {Promise<{}>} A promise to the user.
 */
const getUserWithEmail = function (email) {
  return pool.query(`
  SELECT *
  FROM users
  WHERE email = LOWER($1)
  `, [email])
    .then(res => {
      if (res.rowCount < 1) {
        return Promise.resolve(null);
      }
      return Promise.resolve(res.rows[0]);
    });
}

exports.getUserWithEmail = getUserWithEmail;

/**
 * Get a single user from the database given their id.
 * @param {string} id The id of the user.
 * @return {Promise<{}>} A promise to the user.
 */
const getUserWithId = function (id) {
  return pool.query(`
  SELECT *
  FROM users
  WHERE id = $1
  `, [id])
    .then(res => {
      return Promise.resolve(res.rows[0]);
    })
}
exports.getUserWithId = getUserWithId;


/**
 * Add a new user to the database.
 * @param {{name: string, password: string, email: string}} user
 * @return {Promise<{}>} A promise to the user.
 */
const addUser = function (user) {
  return pool.query(`
    INSERT INTO users (name, email, password) 
    VALUES ($1, LOWER($2), $3)
    RETURNING *;
  `, [user.name, user.email, user.password])
    .then(res => {
      return Promise.resolve(res.rows[0]);
    })
}
exports.addUser = addUser;

/// Reservations

/**
 * Get all reservations for a single user.
 * @param {string} guest_id The id of the user.
 * @return {Promise<[{}]>} A promise to the reservations.
 */
const getAllReservations = function (guest_id, limit = 10) {
  return pool.query(`
  SELECT properties.*, reservations.*, AVG(rating) AS average_rating
  FROM properties
  JOIN reservations ON properties.id = reservations.property_id
  JOIN property_reviews ON properties.id = property_reviews.property_id
  WHERE reservations.guest_id = $1
  AND now()::date > reservations.end_date
  GROUP BY properties.id, reservations.id
  ORDER BY reservations.start_date;
  `, [guest_id])
    .then(res => {
      return Promise.resolve(res.rows)
    })
}
exports.getAllReservations = getAllReservations;

/// Properties

/**
 * Get all properties.
 * @param {{}} options An object containing query options.
 * @param {*} limit The number of results to return.
 * @return {Promise<[{}]>}  A promise to the properties.
 */
const getAllProperties = function (options, limit = 10) {
  // Array holds options, if any
  const queryParams = [];
  // Beginning of query 
  let queryString = `
  SELECT properties.*, avg(property_reviews.rating) as average_rating
  FROM properties
  LEFT JOIN property_reviews ON properties.id = property_id
  `;
  // String stores the WHERE clause and add conditions if passed as an option
  let whereString = 'WHERE ';

  if (options.owner_id) {
    if (queryParams.length > 0) {
      whereString += ' AND ';
    }
    queryParams.push(options.owner_id);
    whereString += `owner_id = $${queryParams.length}`;
  }

  if (options.city) {
    if (queryParams.length > 0) {
      whereString += ' AND ';
    }
    queryParams.push(`%${options.city}%`);
    whereString += `LOWER(city) LIKE LOWER($${queryParams.length}) `;
  }

  if (options.minimum_price_per_night) {
    if (queryParams.length > 0) {
      whereString += ' AND ';
    }
    queryParams.push(options.minimum_price_per_night * 100);
    whereString += `properties.cost_per_night >= ($${queryParams.length}) `;
  }

  if (options.maximum_price_per_night) {
    if (queryParams.length > 0) {
      whereString += ' AND ';
    }
    queryParams.push(options.maximum_price_per_night * 100);
    whereString += `cost_per_night <= ($${queryParams.length}) `;
  }

  if (options.minimum_rating) {
    if (queryParams.length > 0) {
      whereString += ' AND ';
    }
    queryParams.push(options.minimum_rating);
    whereString += `rating >= ($${queryParams.length}) `;
  }

  if (queryParams.length > 0) {
    queryString += whereString;
  }

  // Remainder of query
  queryParams.push(limit);
  queryString += `
  GROUP BY properties.id
  ORDER BY cost_per_night
  LIMIT $${queryParams.length};
  `;

  // Run query
  return pool.query(queryString, queryParams)
    //.then(res => res.rows);
    .then(res => res.rows)
}
exports.getAllProperties = getAllProperties;


/**
 * Add a property to the database
 * @param {{}} property An object containing all of the property details.
 * @return {Promise<{}>} A promise to the property.
 */
const addProperty = function (property) {

  const queryString = `
  INSERT INTO properties (owner_id, title, description, thumbnail_photo_url, cover_photo_url, cost_per_night, street, city, province, post_code, country, parking_spaces, number_of_bathrooms, number_of_bedrooms)
  VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14)
  RETURNING *;
  `;

  const values = [property.owner_id, property.title, property.description, property.thumbnail_photo_url, property.cover_photo_url, property.cost_per_night, property.street, property.city, property.province, property.post_code, property.country, property.parking_spaces, property.number_of_bathrooms, property.number_of_bathrooms];

  return pool.query(queryString, values)
    .then(res => {
      return Promise.resolve(res.rows[0])
    });
}
exports.addProperty = addProperty;


