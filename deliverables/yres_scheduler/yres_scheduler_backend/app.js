
const express = require('express');
const bodyParser = require('body-parser');
var morgan = require('morgan')

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
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
require('./api/routes/counselorRoutes')(app);
require('./api/routes/roomRoutes')(app);

module.exports = app;