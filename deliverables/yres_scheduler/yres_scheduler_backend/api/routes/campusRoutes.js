const campusService = require('../controllers/campusController');

module.exports = (app) => {
    app.get('/campus/get', async (req, res) => {
        const campus = await campusService.getCampus(req, res)
        res.send(campus);
    })

    .get('/campus/getall', async (req, res) => {
        const all_campuses = await campusService.getAllCampuses(req, res)
        res.send(all_campuses);
    });
};