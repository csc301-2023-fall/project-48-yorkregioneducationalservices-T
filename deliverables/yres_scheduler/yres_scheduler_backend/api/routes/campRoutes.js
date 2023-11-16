const campService = require('../controllers/campController');

module.exports = (app) => {
    app.get('/camp/get/', async (req, res) => {
        const camp = await campService.getCamp(req, res);
        res.send(camp);
    })

    .get('/camp/getAllByCampusID/', async (req, res) => {
        const all_camps = await campService.getAllCamps(req, res);
        res.send(all_camps);
    })

    .post('/camp/create/', async (req, res) => {
        const status = await campService.createCamp(req, res);
        res.status(200).send(status);
    });
};