
const Pool = require('pg').Pool
const pool = new Pool({
  user: 'test',
  host: 'localhost',
  database: 'hygo',
  password: 'password',
  port: 5432,
})

module.exports = pool;
