const mongoose = require('mongoose')
const express = require('express') 
const cors = require('cors')
const app = express() 
const bodyParser = require('body-parser')

const ipv4 = '192.168.1.189'
const port = '3000'

app.use(bodyParser.json());
app.use(cors());

//connecting to our database on the cloud
mongoose.connect("mongodb://localhost:27017/FYP2019");

var db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));
 
db.once('open', function() {
    console.log("Connection Successful!");
    
    // Creating the data schema to store the temperature and humidity
    const dataSchema = mongoose.Schema({    
        temperature: Number,
        humidity: Number,
    },
    {
        timestamps: true
    })

    // Creating the Model
    const Data = mongoose.model('Data', dataSchema)

// Configuring GET endpoint
app.get('/data', (req, res)=>{
    Data.find({}, null, {sort: {_id: -1}}, (err, data) => {
        if (err) return console.log("Error: ", err)
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.send(data)
    })

    // Configuring POST endpoint
    app.post('/data', (req, res) => {
        let  newData = Data(req.body)
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

    // Configuring the PUT endpoint
    app.put('/data/:id', (req, res) => {
        Data.findByIdAndUpdate(req.params.id, req.body, {new: true}, function(err, data) {
            if (err) return res.status(500).send(err);
            return res.send(data);
        })
    })

    // Configuring the DELETE endpoint
    app.delete('/data/:id', (req, res) => {
        Data.findByIdAndRemove(req.params.id, function(err, data) {
            if (err) return res.status(500).send(err);
            return res.send(data);
        })
    })
});

app.listen(port, ipv4)
console.log("Server is running on " + ipv4 + ":" + port)