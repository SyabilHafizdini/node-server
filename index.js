const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const config = require('config');

// initialise database
require('./database');

// Models
const TemperatureHumidity = require('./models/TemperatureHumidity');

// make express app
const app = express();

app.use(bodyParser.json());
app.use(cors());

// Configuring GET endpoint
app.get('/data', (req, res)=>{
    TemperatureHumidity.find({}, null, {sort: {date: -1, time: -1}}, (err, data) => {
        if (err) return console.log("Error: ", err)
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.send(data)
    })
})

// Configuring POST endpoint
app.post('/data', (req, res) => {
    let  newData = TemperatureHumidity(req.body)
    newData.save((err, results) => {
        if (err) {
            console.log("Error: ", err)
            process.exit(1)
        } else {
            console.log("Saved: ", results)
            res.sendStatus(201)
        }
    })
})

// always change this ip for local usage
const ip = config.get('ips.home.feek');
const port = config.get('server.port');

app.listen(port, ip);
console.log("Server is running on " + ip + ":" + port)