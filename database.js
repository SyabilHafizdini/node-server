const mysql = require('mysql');
const config = require('config');

const {
  host,
  user,
  password,
  database
} = config.get('database');

const pool = mysql.createPool({
  connectionLimit: 100,
  host: "localhost",
  user: 'root',
  password: 'password',
  database: 'fyp2019',
  debug: false
});

module.exports = pool;