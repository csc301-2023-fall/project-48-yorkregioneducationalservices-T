const winston = require('winston');

const { combine, timestamp, json } = winston.format;

// Log only if the severity level is greater than or equal to error
const errorFilter = winston.format((info, opts) => {
  return info.level === 'error' ? info : false;
});

// Log only if the severity level is less than error
const infoFilter = winston.format((info, opts) => {
  return info.level === 'info' ? info : false;
});

const debugFilter = winston.format((info, opts) => {
    return info.level === 'debug' ? info : false;
});

// Log only if http requests - with morgan
const httpFilter = winston.format((info, opts) => {
  return info.level === 'info' ? info : false;
});

// Create a custom format for log entries
const logger = winston.createLogger({
  level: 'http',
  format: combine(
    timestamp({
      format: 'YYYY-MM-DD hh:mm:ss.SSS A',
    }),
    json()
  ),
  transports:  [
    new winston.transports.File({
      filename: './logging/all-backend-logs.log',
    }),
    new winston.transports.File({
      filename: './logging/backend-http.log',
      level: 'http',
      format: combine(httpFilter(), timestamp(), json()),
    }),
    new winston.transports.File({
      filename: './logging/backend-error.log',
      level: 'error',
      format: combine(errorFilter(), timestamp(), json()),
    }),
    new winston.transports.File({
      filename: './logging/backend-info.log',
      level: 'info',
      format: combine(infoFilter(), timestamp(), json()),
    }),
    new winston.transports.File({
        filename: './logging/backend-debug.log',
        level: 'debug',
        format: combine(debugFilter(), timestamp(), json()),
      }),
  ],
});

module.exports = logger;