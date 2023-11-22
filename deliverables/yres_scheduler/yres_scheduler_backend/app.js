
const express = require('express');
const bodyParser = require('body-parser');
var morgan = require('morgan');
const winston = require('winston');

const app = express();
const errorHandler = require('./api/middleware/errorHandler');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

const { combine, timestamp, json } = winston.format;

// Create a custom format for log entries
const logger = winston.createLogger({
  level: 'http',
  format: combine(
    timestamp({
      format: 'YYYY-MM-DD hh:mm:ss.SSS A',
    }),
    json()
  ),
  transports: [new winston.transports.Console()],
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
      console.log('Server is ready!');
  })
  .catch((error) => {
      console.error('Error connecting to the database:', error);
      exit(1);
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

module.exports = app, logger;