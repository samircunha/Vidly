const winston = require("winston");

module.exports = function (err, req, res, next) {
  winston.error(err.message, { meta: err.meta });

  res.status(500).send("Something Failed");
};
