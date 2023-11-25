/**
 * This module specifies the routes for request endpoints in the activity service.
 * 
 * @param {Object} [app] The express application
 * 
 * @module api/routes/activityRoutes
 * @requires api/controllers/activityController
 */

const activityController = require('../controllers/activityController');

const activityRoutes = (app) => {

    /**
     * Route to get all activities.
     * @name GET /activity/all/
     * @memberof module:routes/activityRoutes
     * @param {Object} req - The Express request object.
     * @param {Object} res - The Express response object.
     */
    app.get('/activity/all', async (req, res) => {
        const all_activities = await activityController.getAllActivities(req, res);    
        res.send(all_activities);
    })

    /**
     * Route to create a new activity.
     * @name POST /activity/create/
     * @memberof module:routes/activityRoutes
     * @param {Object} req - The Express request object.
     * @param {Object} res - The Express response object.
     */
    .post('/activity/create', async (req, res) => {
        const resp = await activityController.createActivity(req, res);
        res.send(resp);
    })

    /**
     * Route to edit an activity by its ID.
     * @name POST /activity/:activity_id/edit
     * @memberof module:routes/activityRoutes
     * @param {Object} req - The Express request object.
     * @param {Object} res - The Express response object.
     */
    .post('/activity/:activity_id/edit', async (req, res) => {
        const resp = await activityController.editActivityById(req, res);
        res.send(resp);
    })
    /**
     * Route to delete an activity by its ID.
     * @name DELETE /activity/:activity_id
     * @memberof module:routes/activityRoutes
     * @param {Object} req - The Express request object.
     * @param {Object} res - The Express response object.
     */
    .delete('/activity/:activity_id', async (req, res) => {
        const resp = await activityController.deleteActivityById(req, res);
        res.send(resp);
    });
};

module.exports = activityRoutes;