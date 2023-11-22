
const express = require('express');
const bodyParser = require('body-parser');
var morgan = require('morgan');
const winston = require('winston');

const app = express();
const errorHandler = require('./api/middleware/errorHandler');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

const { combine, timestamp, json } = winston.format;

// Log only if the severity level is greater than or equal to error
const errorFilter = winston.format((info, opts) => {
  return info.level === 'error' ? info : false;
});

// Log only if the severity level is less than error
const infoFilter = winston.format((info, opts) => {
  return info.level === 'info' ? info : false;
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
  ],
});

const morganMiddleware = morgan(
  ':method :url :status :res[content-length] - :response-time ms',
  {
    stream: {
      // Configure Morgan to use our custom logger with the http severity
      write: (message) => logger.http(message.trim()),
    },
  }
);

app.use(morganMiddleware);

app.use(morgan('dev'));
app.use('/demo', express.static('./api/res/d2_public'));
const { connectDB } = require('./api/db/db');


app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader(
    'Access-Control-Allow-Methods',
    'GET, POST, OPTIONS, PUT, PATCH, DELETE'
  );
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-Requested-With,content-type'
  );
  res.setHeader('Access-Control-Allow-Credentials', true);
  next();
});

// Call the connectDB function to establish the database connection
connectDB()
  .then(() => {
      // Kept the console.log for server deployment
      console.log('Server is ready!');
      logger.info('Server is ready!');
  })
  .catch((error) => {
      console.error('Error connecting to the database:', error);
      logger.error(`Error connecting to the database: ${error}`);
      process.exit(1);
  });

require('./api/routes/scheduleRoutes')(app);
require('./api/routes/campRoutes')(app);
require('./api/routes/accountRoutes')(app);
require('./api/routes/studentRoutes')(app);

require('./api/routes/campusRoutes')(app);
require('./api/routes/groupRoutes')(app);
require('./api/routes/blockRoutes')(app);
require('./api/routes/counselorRoutes')(app);

require('./api/routes/roomRoutes')(app);
require('./api/routes/activityRoutes')(app);

app.use(errorHandler);

module.exports = { app, logger };