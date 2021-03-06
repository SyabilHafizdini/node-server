const mysql = require('mysql2');
const config = require('config');

const pool = mysql.createPool(config.get('database'));
const promisePool = pool.promise();

module.exports = promisePool;