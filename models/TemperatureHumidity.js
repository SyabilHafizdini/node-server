const mongoose = require('mongoose');
const config = require('config');

const schema = mongoose.Schema({    
  temperature: Number,
  humidity: Number,
  time: { type: [String], index: true},
  date: String
}, {
  collection: config.get('models.TemperatureHumidity.collectionName')
});

const TemperatureHumidity = mongoose.model('TemperatureHumidity', schema);

module.exports = TemperatureHumidity;
