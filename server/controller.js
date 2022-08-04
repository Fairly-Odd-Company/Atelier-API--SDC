const db = require('../db/query.js');
const format = require('pg-format');


exports.getAllreviews =  (req, res) => {
  var { product_id, page, count, sort } = req.query

  if(sort === 'newest') {
    sort = 'date';
  } else if (sort === 'relevant') {
    sort = 'rating';
  } else if (sort === undefined) {
    sort = 'date';
  }

  var end = count || 5;
  var start = page > 1 ? page * end : 0;

  const query = `

  SELECT row_to_json(t)
  from (
    select
    json_build_object(
      'product', ${product_id},
      'page', ${start},
      'count', ${end},
      'results', (select coalesce (array_to_json(array_agg(row_to_json(r))), '[]')
      from  (
        select
        reviews.review_id,
        reviews.rating,
        reviews.summary,
        reviews.recommend,
        reviews.response,
        reviews.body,
        (SELECT to_timestamp(reviews.date/1000) as date),
        reviews.reviewer_name,
        reviews.helpfulness,
        (SELECT COALESCE (array_agg(json_build_object(
                            'id', photos.id,
                            'url', photos.url)), '{}')
                            FROM photos WHERE photos.review_id = reviews.review_id) as photos
      from reviews
      where product_id=${product_id} and not reported = true
      GROUP BY reviews.review_id
      order by ${sort} DESC
      OFFSET ${start} LIMIT ${end}
      )r
  ))
  )t`;

  db.query(query)
    .then((response) => {
      res.send(response.rows[0].row_to_json.json_build_object);
    })
    .catch((err) => {
      return console.log(err);
      res.send(err);
    })
};


exports.getMeta = (req, res) => {
  const { product_id } = req.query;

const query = `
WITH tchars AS (SELECT id, name from characteristic WHERE product_id = ${product_id})
select row_to_json(t)
from (
  select json_build_object(
  'product', '${product_id}',
  'rating', json_build_object(
        '1', (SELECT COUNT(rating) FROM reviews WHERE rating=1 AND product_id = ${product_id}),
        '2', (SELECT COUNT(rating) FROM reviews WHERE rating=2 AND product_id = ${product_id}),
        '3', (SELECT COUNT(rating) FROM reviews WHERE rating=3 AND product_id = ${product_id}),
        '4', (SELECT COUNT(rating) FROM reviews WHERE rating=4 AND product_id = ${product_id}),
        '5', (SELECT COUNT(rating) FROM reviews WHERE rating=5 AND product_id = ${product_id})
        ),
  'recommend', json_build_object(
        'true', (SELECT COUNT(recommend) FROM reviews WHERE recommend = true AND product_id = ${product_id}),
        'false', (SELECT COUNT(recommend) FROM reviews WHERE recommend = false AND product_id = ${product_id})
        ),
     'characteristics', (SELECT json_object_agg(tchars.name, json_build_object('id', tchars.id, 'value', (SELECT avg(value) FROM characteristic_reviews WHERE characteristic_reviews.characteristic_id = tchars.id))) from tchars)

))t`;

  db.query(query)
  .then((response) => {
    res.send(response.rows[0].row_to_json.json_build_object);
  })
  .catch((err) => {
    return console.log(err);
    res.send(err);
  })
};

exports.incrementHelpful = (req, res) => {
  const query = `
  UPDATE reviews
  SET helpfulness = helpfulness + 1
  WHERE review_id=${req.params.review_id}`;

  db.query(query)
  .then((response) => {
    console.log(response);
    res.sendStatus(204);
  })
  .catch((err) => {
    res.send(err);
  })
};

exports.reportReview = (req, res) => {
  const query = `
  UPDATE reviews
  SET reported = true
  WHERE review_id = ${req.params.review_id};`

  db.query(query)
  .then((response) => {
    console.log(response);
    res.sendStatus(204);
  })
  .catch((err) => res.send(err));
};

exports.insertReview = (req, res) => {
  const { product_id, rating, summary, body, recommend, name, email, photos, characteristics } = req.body;
  const values = [product_id, rating, summary, body, recommend, name, email];
  console.log(values);
  const photosRows = [];
  const characterisitcs_array = [];
  console.log(characterisitcs_array);


  db.query(`
    insert into reviews (product_id, rating, summary, body, recommend,
    reviewer_name, reviewer_email, response, date)
    VALUES ($1, $2, $3, $4, $5, $6, $7, 'hello', (SELECT EXTRACT ( EPOCH FROM now())) * 1000 )
    returning review_id;
  `, values)
    .then((result) => {
      const { review_id } = result.rows[0];

      for (let i = 0; i < photos.length; i++) {
        photosRows.push([review_id, photos[i]]);
      }
      console.log('hi', photosRows);
      db.query(format(`INSERT INTO photos (review_id, url) VALUES %L`, photosRows), []);
      return review_id;
    })
    .then((review_id) => {
      console.log(review_id);
      console.log(characteristics, 'char');
      for(let key in characteristics) {
        characterisitcs_array.push([key, characteristics[key], review_id]);
      }
      console.log(characterisitcs_array)
      return db.query(format(`INSERT INTO characteristic_reviews (characteristic_id, value, review_id) VALUES %L`, characterisitcs_array), []);
    })
  .then(() => res.status(201).send('Created'))
  .catch((err) => console.log(err));
};

exports.loaderio = (req, res) => {
  res.sendFile('/home/ubuntu/Atelier-Reviews-API/loaderio/loaderio-5f74b65164351c6e8cfe4b695d5f05df.txt', (err) => {
    if(err){
    console.log('error');
    } else {
      console.log('sentfile');
    }
  }
)
}