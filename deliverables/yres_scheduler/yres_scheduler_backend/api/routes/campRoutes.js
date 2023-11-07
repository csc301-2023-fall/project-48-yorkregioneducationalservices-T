const campService = require('../controllers/campController');

module.exports = (app) => {
    app.get('/camp/', (req, res) => {
        res.send(campService.getCamp(req, res));
    });
};