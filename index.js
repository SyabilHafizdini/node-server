const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const config = require('config');
const mysql = require('mysql')

// initialise database
const pool = require('./database');

// Models
//const TemperatureHumidity = require('./models/TemperatureHumidity');

// make express app
const app = express();

app.use(bodyParser.json());
app.use(cors());

// Configuring GET endpoint
// app.get('/data', (req, res)=>{
//     var date = req.query.date;
//     TemperatureHumidity.find({date}, null, {sort: {date: -1, time: -1}}, (err, data) => {
//         if (err) return console.log("Error: ", err)
//         res.send(data)
//     })
// })

// Configuring GET endpoint

function query_data(req, res) {
    pool.query('SELECT * FROM `temphumid` ORDER BY `datetime` DESC', function(err, rows) {
        if(err) {
            return res.json({'error': true, 'message': 'Error occurred'+err});
        }
            res.send(rows)
    });
}


app.get('/data/all', (req, res) => {
    query_data(req,res);
})


function insert_data(data, res) {
    let insertQuery = 'INSERT INTO ?? (??,??,??) VALUES (?,?,?)';
    let query = mysql.format(insertQuery,
        ["temphumid", "datetime", "temperature", "humidity",
        data.datetime, data.temperature, data.humidity]);
    pool.query(query, (err, response) => {
        if (err) {
            console.log("Error: ", err)
            process.exit(1);
        }
            console.log("Saved: " + response.insertId);
            res.sendStatus(201)
    });
}

// Configuring POST endpoint
app.post('/data', (req, res) => {
    insert_data(req.body, res);
})

// // Configuring POST endpoint
// app.post('/data', (req, res) => {
//     let  newData = TemperatureHumidity(req.body)
//     newData.save((err, results) => {
//         if (err) {
//             console.log("Error: ", err)
//             process.exit(1)
//         } else {
//             console.log("Saved: ", results)
//             res.sendStatus(201)
//         }
//     })
// })

// always change this ip for local usage
const ip = config.get('ips.home.desktop');
const port = config.get('server.port');

app.listen(port, ip);
console.log("Server is running on " + ip + ":" + port)