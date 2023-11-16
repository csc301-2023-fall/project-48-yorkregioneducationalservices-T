const scheduleService = require('../controllers/scheduleController');

module.exports = (app) => {
    app.post('/schedule/generate/', (req, res) => {
        var result;
        try {
            result = scheduleService.generateSchedule(req, res)
        } catch(err) {
            res.status(500).send({error: err.message});
        }
        res.send(result);
    })

    .get('/schedule/getAll/', async (req, res) => {
        const all_schedules = await scheduleService.getAllSchedules(req, res);
        res.send(all_schedules);
    });
};