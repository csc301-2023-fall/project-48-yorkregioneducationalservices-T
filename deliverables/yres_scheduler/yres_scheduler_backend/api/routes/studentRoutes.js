const campService = require('../controllers/studentController');

module.exports = (app) => {
    app.get('/students/', (req, res) => {
        res.send(campService.getStudents(req, res));
    });
};