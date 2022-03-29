const express = require('express'); 
const app = express();
const Joi = require("joi");
Joi.objectId = require("joi-objectid")(Joi);

require('./startup/config')();
require('./startup/db')();
require('./startup/routes')(app);

const PORT = process.env.PORT ;
app.listen(PORT, () => { 
    console.log(`Listening on port ${PORT}`);
});