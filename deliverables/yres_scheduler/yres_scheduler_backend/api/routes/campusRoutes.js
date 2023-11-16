const campusService = require('../controllers/campusController');

module.exports = (app) => {
    app.get('/campus/get', async (req, res) => {
        const campus = await campusService.getCampus(req, res);
        res.send(campus);
    })

    .get('/campus/getAll', async (req, res) => {
        const all_campuses = await campusService.getAllCampuses(req, res);
        res.send(all_campuses);
    })

    .post('/campus/create', async (req, res) => {
        const status = await campusService.createCampus(req, res);
        res.status(200).send(status);
    });
};