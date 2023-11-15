const config = require('config');
const app = require('./app');

const PORT = process.env.PORT || config.get('server.PORT');

const server = app.listen(PORT, () => {
  console.log('server is running on port', server.address().port);
});