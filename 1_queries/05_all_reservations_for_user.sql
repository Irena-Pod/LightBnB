SELECT properties.*, reservations.*, AVG(rating) AS average_rating
FROM properties
JOIN reservations ON properties.id = reservations.property_id
JOIN property_reviews ON properties.id = property_reviews.property_id
WHERE reservations.guest_id = 1 
AND now()::date > reservations.end_date
GROUP BY properties.id, reservations.id
ORDER BY reservations.start_date
LIMIT 10;