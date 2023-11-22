const config = require('config');
const app = require('./app');
const logger = require('./logger');

const PORT = process.env.PORT || config.get('server.PORT');

const server = app.listen(PORT, () => {
  console.log('server is running on port', server.address().port);
  logger.info(`server is running on port ${server.address().port}`);
});