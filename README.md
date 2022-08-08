#Atelier Reviews API 

Create a dedicated micro-service with modern architecture to boost performance and reliability of legacy API 

## Installation Instructions: 

- [ ] **Git Clone:** `git clone https://github.com/Fairy-Company/Atelier-Reviews-API.git`


- [ ] **Install the dependencies:**
`npm install`


- [ ] **Create DB:**
`Run the schema with ETL inside postgresql terminal`


- [ ] **Run the service:**
`npm run server-dev`

## Service Information: 

`Design a PostgreSQL schema for the reviews service` 
 
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

`Transform existing application data and load it into the database`

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

Design and build an API server to provide data to the client in the format specified by the legacy API documentation

`Optimize the service by analyzing query times and server responses`

Deploy service on AWS 
Measure and improve the performance of the service at scale 


