//Importing modules
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const config = require('config');
const mysql = require('mysql')
const TempHumidService = require('./services/TempHumidService');

//Initialise database
const pool = require('./database');

//Make the express app
const app = express();

//Enables us to parse json 
app.use(bodyParser.json());

//Bypass CORS
app.use(cors());

const service = new TempHumidService(pool);

//GET endpoint(s)
app.get('/api/readings', async (req, res) => {
    await readings(req,res);
})

app.get('/api/dates', async (req, res) => {
    await query_dates(req, res);
})


app.get('/api/users', async (req, res) => {
    await check_user_creds(req, res);
})

//POST endpoint(s)
app.post('/data', async (req, res) => {
    await post_data(req.body, res);
})

//GET calculation endpoint(s)
app.get('/api/calculations/average', async (req, res) => {
    await calculate_average(req, res);
})

app.get('/api/calculations/highest', async (req, res) => {
    await calculate_highest(req, res);
})

app.get('/api/calculations/lowest', async (req, res) => {
    await calculate_lowest(req, res);
})

//GET function(s)

/* dataExample = {
        "datetime": "20/06/19 08:08:12",
        "temperature": 31,
        "humidity": 40
    }
*/

//Returns data from specific date if queried, otherwise returns whole all the data in the database
async function readings(req, res) {
    try {
        date = req.query.date;
        const data = (date ? await service.getDataFromSpecificDate(date) : await service.getAll());
        res.send(data);
    } catch(e){
        console.error(e);
    }
}

//Returns only the dates (e.g., ["14/06/19", "15/06/19" ...])
async function query_dates(req, res) {
    try {
        const data = await service.getAllDates();
        res.send(data);
    } catch(e){
        console.error(e);
    }
}

//Returns an object if username and password is correct, returns an empty array if it's not
async function check_user_creds(req, res) {
    try {
        username = req.query.username;
        password = req.query.password;
        const data = await service.checkUserCredentials(username, password);
        res.send(data);
    } catch(e){
        console.error(e);
    }
}

//POST function(s)

//Post data to our database and logs the insert ID
async function post_data(data, res) {
    try {
        const post_result = await service.postTempHumidData(mysql, data);
        console.log("Saved: " + post_result.insertId);
        res.sendStatus(201);
    } catch(e){
        console.error(e);
    }
}

//Calculation function(s)

//Returns the average temperature and humidity of a given date
async function calculate_average(req, res) {
    try {
        date = req.query.date;
        const data = await service.getAverage( await service.getDataFromSpecificDate(date) );
        res.send(data);
    } catch(e){
        console.error(e);
    }
}

//Returns the highest temperature and humidity of a given date
async function calculate_highest(req, res) {
    try {
        date = req.query.date;
        const data = await service.getHighest( await service.getDataFromSpecificDate(date) );
        res.send(data);
    } catch(e){
        console.error(e);
    }
}

//Returns the lowest temperature and humidity of a given date
async function calculate_lowest(req, res) {
    try {
        date = req.query.date;
        const data = await service.getLowest( await service.getDataFromSpecificDate(date) );
        res.send(data);
    } catch(e){
        console.error(e);
    }
}

//Setting PORT and IP for node server
const ip = config.get('ips.home.desktop');
const port = config.get('server.port');

//Running node server
app.listen(port, ip);
console.log("Server is running on " + ip + ":" + port);