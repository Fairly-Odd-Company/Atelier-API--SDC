DROP TABLE IF EXISTS reviews CASCADE;

CREATE TABLE reviews (
  review_id SERIAL UNIQUE,
  product_id INT NOT NULL,
  rating INT NOT NULL,
  date BIGINT NOT NULL,
  summary VARCHAR(150) NOT NULL,
  body VARCHAR(500) NOT NULL,
  recommend BOOLEAN NOT NULL,
  reported BOOLEAN NOT NULL DEFAULT FALSE,
  reviewer_name VARCHAR(150) NOT NULL,
  reviewer_email VARCHAR(250) NOT NULL,
  response VARCHAR(200) DEFAULT NULL,
  helpfulness INTEGER NOT NULL DEFAULT 0,
  PRIMARY KEY (review_id)
);

-- -- ---
-- -- Table 'photos'
-- --
-- -- ---

DROP TABLE IF EXISTS photos CASCADE;

CREATE TABLE photos (
  id SERIAL UNIQUE,
  review_id INTEGER NOT NULL,
  url VARCHAR(200) NOT NULL,
  PRIMARY KEY (id)
);


-- -- ---
-- -- Table 'characteristic'
-- --
-- -- ---

DROP TABLE IF EXISTS characteristic CASCADE;

CREATE TABLE characteristic (
  id SERIAL UNIQUE,
  product_id INT NOT NULL,
  name VARCHAR(20),
  PRIMARY KEY (id)
);


-- -- ---
-- -- Table 'characteristic_review'
-- --
-- -- ---
DROP TABLE IF EXISTS characteristic_reviews CASCADE;

CREATE TABLE characteristic_reviews (
  id SERIAL UNIQUE,
  characteristic_id INT NOT NULL,
  review_id INT NOT NULL,
  value INTEGER NOT NULL,
  PRIMARY KEY (id)
);


-- -- ---
-- -- Foreign Keys
-- -- ---

ALTER TABLE characteristic_reviews ADD FOREIGN KEY (characteristic_id) REFERENCES characteristic (id);
ALTER TABLE photos ADD FOREIGN KEY (review_id) REFERENCES reviews (review_id);



COPY reviews
FROM '/Users/kesang/Desktop/HackReactor/SDC/Atelier-API-SDC/data/reviews (1).csv'
DELIMITER ','
CSV HEADER;

COPY photos
FROM '/Users/kesang/Desktop/HackReactor/SDC/Atelier-API-SDC/data/reviews_photos.csv'
DELIMITER ','
CSV HEADER;

COPY characteristic
FROM '/Users/kesang/Desktop/HackReactor/SDC/Atelier-API-SDC/data/characteristics.csv'
DELIMITER ','
CSV HEADER;

COPY characteristic_reviews
FROM '/Users/kesang/Desktop/HackReactor/SDC/Atelier-API-SDC/data/characteristic_reviews.csv'
DELIMITER ','
CSV HEADER;

CREATE INDEX product_indx ON reviews (product_id, reported);
CREATE INDEX helpfulness_indx ON reviews (helpfulness);
CREATE INDEX date_indx ON reviews (date);
CREATE INDEX rating_indx ON reviews (rating);
CREATE INDEX review_id_indx ON reviews (review_id);

CREATE INDEX p_review_id_indx ON photos (review_id);
CREATE INDEX characteristic_product_id_indx ON characteristic (product_id);
CREATE INDEX characteristic_reviews_characteristic_id_indx ON characteristic_reviews (characteristic_id);