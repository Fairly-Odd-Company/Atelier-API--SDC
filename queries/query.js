const { Client } = require('pg');

const client = new Client({
  user: 'kesang',
  host: 'localhost',
  database: 'sdc_rr',
  password: 'kesang2021',
  port: 5432,
});

client.connect();

const query = `SELECT review_id, rating, summary, recommend, response, body, date, reviewer_name, helpfulness FROM reviews WHERE product_id=2 LIMIT 2`;


client.query(query, (err, res) => {
  if(err) {
    console.log(err);
  }
  
  console.log(res.rows);
  client.end();
});
