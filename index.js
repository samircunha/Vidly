const express = require('express'); 
const winston = require('winston')
const app = express();
const Joi = require("joi");
Joi.objectId = require("joi-objectid")(Joi);


require('./startup/routes')(app);
require('./startup/logging')();
require('./startup/config')();
require('./startup/db')();

const PORT = process.env.PORT ;
app.listen(PORT, () => { 
    winston.info(`Listening on port ${PORT}`);
});