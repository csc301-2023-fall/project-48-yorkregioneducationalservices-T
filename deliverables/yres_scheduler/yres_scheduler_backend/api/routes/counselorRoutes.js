/**
 * This module specifies the routes for request endpoints in the counselor service.
 * 
 * @param {Object} [app] The express application
 * 
 * @module api/routes/counselorRoutes
 * @requires api/controllers/counselorController
 */

const counselorController = require('../controllers/counselorController');
const logger = require('../../logger');

const counselorRoutes = (app) => {
    /**
     * GET endpoint that retrieves all counselors by campus.
     * @name GET /counselor/all
     * @memberof module:/routes/counselorRoutes
     * @param {Object} req - The Express request object.
     * @param {Object} res - The Express response object.
     */
    app.get('/counselor/all/', async (req, res) => {
        logger.info(`GET /counselor/all/`);
        const result = await counselorController.getAllCounselors(req, res);
        res.send(result);
    })
    /**
     * POST endpoint that creates a new counselor.
     * @name POST /counselor/createCounselor
     * @memberof module:/routes/counselorRoutes
     * @async
     * @param {Object} req - The Express request object.
     * @param {Object} res - The Express response object.
     */
    .post('/counselor/create/', async (req, res) => {
        logger.info(`POST /counselors/createCounselor`);
        const result = await counselorController.createCounselor(req, res);
        res.send(result);
    })
    /**
     * POST endpoint that edits an existing counselor by ID.
     * @name POST /counselor/edit/
     * @memberof module:/routes/counselorRoutes
     * @async
     * @param {Object} req - The Express request object.
     * @param {Object} res - The Express response object.
     */
    .post('/counselor/edit', async (req, res) => {
        logger.info(`POST /counselor/edit/`);
        const result = await counselorController.editCounselorById(req, res);
        res.send(result);
    })
    /**
     * POST endpoint that deletes an existing counselor by ID.
     * @name DELETE /counselor/:counselor_id
     * @memberof module:/routes/counselorRoutes
     * @async
     * @param {Object} req - The Express request object.
     * @param {Object} res - The Express response object.
     */
    .delete('/counselor/:counselor_id', async (req, res) => {
        logger.info(`POST /counselors/deleteCounselorById/`);
        const result = await counselorController.deleteCounselorById(req, res);
        res.send(result);
    })

};

module.exports = counselorRoutes;