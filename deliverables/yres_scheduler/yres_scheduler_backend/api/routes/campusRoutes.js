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

const campusController = require('../controllers/campusController');
const auth = require('../middleware/authHandler');

const campusRoutes = (app) => {

    /**
     * Route to get all campuses.
     * @name GET /campus/all
     * @memberof module:routes/campusRoutes
     * @param {Object} req - The Express request object.
     * @param {Object} res - The Express response object.
     */
    app.get('/campus/all', auth, async (req, res) => {
        const all_campuses = await campusController.getAllCampuses(req, res);
        res.send(all_campuses);
    })

    /**
     * Route to get a campus by id.
     * @name GET /campus/:campus_id
     * @memberof module:routes/campusRoutes
     * @param {Object} req - The Express request object.
     * @param {Object} res - The Express response object.
     */
    .get('/campus/:campus_id', auth, async (req, res) => {
        const campus = await campusController.getCampus(req, res);
        res.send(campus);
    })
   
    /**
     * Route to create a new campus.
     * @name GET /campus/create/
     * @memberof module:routes/campusRoutes
     * @param {Object} req - The Express request object.
     * @param {Object} res - The Express response object.
     */
    .post('/campus/create/', auth, async (req, res) => {
        const status = await campusController.createCampus(req, res);
        res.send(status);
    });
};

module.exports = campusRoutes;