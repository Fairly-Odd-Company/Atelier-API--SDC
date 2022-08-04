const { Pool } = require('pg');

const pool = new Pool({
  // host: '3.101.131.196',
  host: 'localhost',
  user: 'kesang',
  database: 'sdc_rr',
  password: 'kesang2021'
});

pool.on('error', (err, client) => {
  console.log('Unexpected error on idle client', err);
  process.exit(-1);
})

module.exports = {
  query: (text, params) => {
    console.log('Making a query');
    return pool.query(text, params);
  }
}


