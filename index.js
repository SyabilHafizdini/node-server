//Importing modules
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const config = require('config');
const mysql = require('mysql');

//Initialise database
const pool = require('./config/database');

//Make the express app
const app = express();

//Enables us to parse json 
app.use(bodyParser.json());

//Bypass CORS
app.use(cors());

//Importing module(s)
const ReadingsController = require('./Modules/Controllers/ReadingsController');
const CalculationsController = require('./Modules/Controllers/CalculationsController');
const DatesController = require('./Modules/Controllers/DatesController');
const UsersController = require('./Modules/Controllers/UsersController');
const EmailController = require('./Modules/Controllers/EmailController');


// initialize controller(s)
new ReadingsController().registerRoutes(app, pool, mysql);
new CalculationsController().registerRoutes(app, pool);
new DatesController().registerRoutes(app, pool);
new UsersController().registerRoutes(app, pool);
new EmailController().registerRoutes(app, pool);

//Setting PORT and IP for node server
const ip = config.get('ips.home.desktop');
const port = config.get('server.port');

//Running node server
app.listen(port, ip);
console.log("Server is running on " + ip + ":" + port);