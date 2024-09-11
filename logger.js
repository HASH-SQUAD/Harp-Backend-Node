const winston = require("winston");
const winstonDaily = require("winston-daily-rotate-file");
const appRoot = require("app-root-path");
const { createLogger } = require("winston");
const process = require("process");

const logDir = `${appRoot}/logs`;

const { combine, timestamp, label, printf } = winston.format;

const logFormat = printf(({ level, message, label, timestamp, ip, path }) => {
  return `${timestamp} [${label}] ${level}: ${message} - IP: ${ip}, Path: ${path}`;
});

const logger = createLogger({
  format: combine(label({ label: "HARP" }), timestamp(), logFormat),
  transports: [
    new winstonDaily({
      level: "info",
      datePattern: "YYYY-MM-DD",
      dirname: `${logDir}/info`,
      filename: "%DATE%.log",
      maxSize: "20m",
      maxFiles: "30d",
    }),
    new winstonDaily({
      level: "error",
      datePattern: "YYYY-MM-DD",
      dirname: `${logDir}/error`,
      filename: "%DATE%.error.log",
      maxSize: "20m",
      maxFiles: "30d",
    }),
  ],
});

if (process.env.NODE_ENV != "prod") {
  logger.add(
    new winston.transports.Console({
      format: winston.format.combine(
        winston.format.colorize(),
        winston.format.simple()
      ),
    })
  );
}

module.exports = logger;