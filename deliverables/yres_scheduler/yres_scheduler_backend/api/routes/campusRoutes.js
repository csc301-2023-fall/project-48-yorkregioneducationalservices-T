const campusService = require('../controllers/campusController');

module.exports = (app) => {
    app.get('/campus/get', (req, res) => {
        res.send(campusService.getCampus(req, res));
    })

    .get('/campus/getall', (req, res) => {
        res.send(campusService.getAllCampuses(req, res));
    });
};