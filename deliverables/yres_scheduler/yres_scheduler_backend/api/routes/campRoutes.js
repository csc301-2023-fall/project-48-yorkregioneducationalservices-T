const campService = require('../controllers/campController');

module.exports = (app) => {
    app.get('/camp/get', (req, res) => {
        res.send(campService.getCamp(req, res));
    })

    .get('/camp/getall', (req, res) => {
        res.send(campService.getAllCamps(req, res));
    });
};