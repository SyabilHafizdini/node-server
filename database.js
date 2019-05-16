const mongoose = require('mongoose');
const config = require('config');

const {
  host,
  port,
  dbName
} = config.get('database');

mongoose.connect(`mongodb://${host}:${port}/${dbName}`);