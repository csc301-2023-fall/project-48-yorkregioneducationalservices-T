/**
 * This module specifies the routes for request endpoints in the campus Service.
 * 
 * @param {Object} [app] The express application
 * 
 * @module api/routes/campusRoutes
 * @requires api/controllers/campusController
 * @requires api/middleware/errorHandler
 * @requires api/middleware/authHandler
 */
const scheduleController = require('../controllers/scheduleController');
const auth = require('../middleware/authHandler');

const scheduleRoutes = (app) => {
    /**
     * Route to generate a new schedule.
     * @name GET /schedule/generate/
     * @function
     * @memberof module:routes/scheduleRoutes
     * @param {Object} req - The Express request object.
     * @param {Object} res - The Express response object.
     */
    app.get('/schedule/generate/', auth, async (req, res) => {
        var result;
        try {
            result = await scheduleController.generateSchedule(req, res)
        } catch(err) {
            res.status(500).send({error: err.message});
        }
        res.send(result);
    })

    .get('/schedule/getCurrent/', async (req, res) => {
        const current_schedule = await scheduleController.getCurrentSchedule(req, res);
        res.send(current_schedule);
    })

    /**
     * Route to get all schedules (should be only one).
     * @name GET /schedule/all/
     * @function
     * @memberof module:routes/scheduleRoutes
     * @param {Object} req - The Express request object.
     * @param {Object} res - The Express response object.
     */
    .get('/schedule/all/', auth, async (req, res) => {
        const all_schedules = await scheduleController.getAllSchedules(req, res);
        res.send(all_schedules);
    });
};

module.exports = scheduleRoutes;