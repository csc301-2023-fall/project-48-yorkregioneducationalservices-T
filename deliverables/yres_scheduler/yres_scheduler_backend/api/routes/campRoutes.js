const campService = require('../controllers/campController');

module.exports = (app) => {
    app.get('/camp/get', async (req, res) => {
        const camp = await campService.getCamp(req, res)
        res.send(camp);
    })

    .get('/camp/getall', async (req, res) => {
        const all_camps = await campService.getAllCamps(req, res)
        res.send(all_camps);
    });
};