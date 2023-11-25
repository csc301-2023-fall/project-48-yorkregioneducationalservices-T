/**
 * This module specifies the routes for request endpoints in the camp Service.
 * 
 * @param {Object} [app] The express application
 * 
 * @module api/routes/campRoutes
 * @requires api/controllers/campController
 */

const campController = require('../controllers/campController');

const campRoutes = (app) => {

    /**
     * Route to get all camps.
     * @name GET /camp/all
     * @memberof module:routes/campRoutes
     * @param {Object} req - The Express request object.
     * @param {Object} res - The Express response object.
     */
    app.get('/camp/all', async (req, res) => {
        const all_camps = await campController.getAllCamps(req, res);
        res.send(all_camps);
    })

    /**
     * Route to get a camp by id.
     * @name GET /camp/:camp_id/
     * @memberof module:routes/campRoutes
     * @param {Object} req - The Express request object.
     * @param {Object} res - The Express response object.
     */
    .get('/camp/:camp_id', async (req, res) => {
        const camp = await campController.getCamp(req, res);
        res.send(camp);
    })

    /**
     * Route to create a new camp.
     * @name GET /camp/create/
     * @memberof module:routes/campRoutes
     * @param {Object} req - The Express request object.
     * @param {Object} res - The Express response object.
     */
    .post('/camp/create', async (req, res) => {
        const status = await campController.createCamp(req, res);
        res.send(status);
    });
};

module.exports = campRoutes;