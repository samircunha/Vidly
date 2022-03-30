const winston = require("winston");
require("winston-mongodb");
require("express-async-errors");

module.exports = function () {
  winston.exceptions.handle(
    new winston.transports.Console(),
    new winston.transports.File({
      filename: "uncaughtExceptions.log",
    })
  );

  process.on("unhnadledRejection", (ex) => {
    throw ex;
  });

  winston.add(
    winston.createLogger({
      format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.json()
      ),
      transports: [
        new winston.transports.Console(),
        new winston.transports.File({
          filename: "logfile.log",
        }),
        new winston.transports.MongoDB({
          db: "mongodb://localhost/vidly",
          options: { useUnifiedTopology: true },
          metaKey: "meta",
        }),
      ],
    })
  );
};
