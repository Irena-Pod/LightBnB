INSERT INTO users (name, email, password) VALUES ('Rachel Green', 'rachel.green@gmail.com', '$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u.'),
('Joey Tribbiani', 'howyoudoin@hotmail.com', '$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u.'),
('Ross Geller', 'ross@geller.com', '$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u.'),
('Chandler Bing', 'chandler@yahoo,com', '$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u.');

INSERT INTO properties (owner_id, title, description, thumbnail_photo_url, cover_photo_url, cost_per_night, parking_spaces, number_of_bathrooms, number_of_bedrooms, country, street, city, province, post_code, active) VALUES (2, 'Joey''s Apartment', 'description', 'https://static.wikia.nocookie.net/friends/images/e/e6/JoeysApartment1.jpg/revision/latest/scale-to-width-down/300?cb=20080728000005', 'https://i2.wp.com/scenetherapy.com/wp-content/uploads/2019/03/Joey-and-Chandlers-Apartment-in-Friends-Lazyboy.jpg?w=809&ssl=1', 500, 0, 1, 2, 'United States', '21 Grove St', 'New York', 'NY', '10014', true),
(4, 'Monica''s Apartment', 'description', 'https://static.wikia.nocookie.net/friends/images/7/74/Monica%27s_apt_2.png/revision/latest/scale-to-width-down/250?cb=20110723170201', 'https://i0.wp.com/scenetherapy.com/wp-content/uploads/2019/01/Monica%E2%80%99s-Apartment-from-Friends-living-room-early-series.jpg?w=1280&ssl=1', 1000, 1, 2, 2, 'United States', '90 Bedford St', 'New York', 'NY', '10016', true),
(3, 'Ross'' Apartment', 'description', 'https://static.wikia.nocookie.net/friends/images/9/9a/Apartamento_ross1.jpg/revision/latest/scale-to-width-down/180?cb=20090710122050', 'https://i0.wp.com/scenetherapy.com/wp-content/uploads/2019/03/Rosss-Apartment-from-Friends-after-Rachel-and-Emma-move-in.jpg?fit=700%2C489&ssl=1', 800, 1, 1, 2, 'United States', '23 Christopher St', 'New York', 'NY', '10017', true),
(1, 'Rachel''s Vacation House', 'description', 'https://photos.zillowstatic.com/fp/bb2679b3ab2fbaedbaffa36969dde5fc-cc_ft_576.jpg', 'https://photos.zillowstatic.com/fp/40e993a7aa83d8529e6eecfb9dfe7fc8-cc_ft_960.jpg', 2300, 10, 9, 6, 'United States', '5 Bailow Ln', 'East Hamptons', 'NY', '11937', true);

INSERT INTO reservations (start_date, end_date, property_id, guest_id) VALUES ('2020-09-15', '2020-09-19', 1, 2),
('2020-08-01', '2020-08-05', 4, 4),
('2020-11-01', '2020-11-04', 2, 3), 
('2019-12-16', '2019-12-18', 3, 1);

INSERT INTO property_reviews (guest_id, property_id, reservation_id, rating, message) VALUES (2, 1, 1, 2, 'message'),
(4, 4, 2, 5, 'message'),
(3, 2, 3, 4, 'message'),
(1, 3, 4, 3, 'message');

