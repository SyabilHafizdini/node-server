const mongoose = require('mongoose')
const express = require('express') 
const cors = require('cors')
const app = express() 
const bodyParser = require('body-parser')

// const ipv4 = '192.168.1.189' //=Home Laptop=
const ipv4 = '192.168.1.109' //=Home Desktop=
// const ipv4 = '192.168.1.138' //=Home2=
const port = '3000'

app.use(bodyParser.json());
app.use(cors());

//connecting to our database running on our server
mongoose.connect("mongodb://192.168.1.189:27017/FYP2019");

// Creating the data schema to store the temperature and humidity
const dataSchema = mongoose.Schema({    
    temperature: Number,
    humidity: Number,
    time: String,
}, {
    collection: "RaspberryPi1"
})

// Creating the Model
const TemperatureHumidity = mongoose.model('TemperatureHumidity', dataSchema)

// Configuring GET endpoint
app.get('/data', (req, res)=>{
    DTemperatureHumidityata.find({}, null, {sort: {_id: -1}}, (err, data) => {
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

app.listen(port, ipv4)
console.log("Server is running on " + ipv4 + ":" + port)