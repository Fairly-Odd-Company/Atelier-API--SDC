DROP TABLE IF EXISTS reviews CASCADE;

CREATE TABLE reviews (
  review_id INT GENERATED ALWAYS AS IDENTITY,
  product_id INT NOT NULL,
  rating INT NOT NULL,
  date BIGINT NOT NULL,
  summary VARCHAR(150) NOT NULL,
  body VARCHAR(500) NOT NULL,
  recommend BOOLEAN NOT NULL,
  reported BOOLEAN NOT NULL DEFAULT FALSE,
  reviewer_name VARCHAR(150) NOT NULL,
  reviewer_email VARCHAR(250) NOT NULL,
  response VARCHAR(200) NOT NULL,
  helpfulness INTEGER NOT NULL DEFAULT 0,
  PRIMARY KEY (review_id)
);

-- -- ---
-- -- Table 'photos'
-- --
-- -- ---

DROP TABLE IF EXISTS photos CASCADE;

CREATE TABLE photos (
  id INT GENERATED ALWAYS AS IDENTITY,
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
  id INT GENERATED ALWAYS AS IDENTITY,
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
  id INT GENERATED ALWAYS AS IDENTITY,
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


