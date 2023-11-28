/**
 * This module specifies the routes for request endpoints in the group service.
 * 
 * @param {Object} [app] The express application
 * 
 * @module api/routes/groupRoutes
 * @requires api/controllers/groupController
 * @requires api/middleware/authHandler
 */
const groupController = require('../controllers/groupController');
const auth = require('../middleware/authHandler');

const groupRoutes = (app) => {
    /**
     * Route to get all groups.
     * @name GET /group/all/
     * @function
     * @memberof module:routes/groupRoutes
     * @param {Object} req - The Express request object.
     * @param {Object} res - The Express response object.
     * @returns {Promise} A Promise that resolves to the result of the getAllGroups function.
     */
    app.get('/group/all/', auth, async (req, res) => {
        const all_groups = await groupController.getAllGroups(req, res);
        res.send(all_groups);
    })

    /**
     * Route to get a group by id.
     * @name GET /group/:group_id
     * @function
     * @memberof module:routes/groupRoutes
     * @param {Object} req - The Express request object.
     * @param {Object} res - The Express response object.
     * @returns {Promise} A Promise that resolves to the result of the getGroup function.
     */
    .get('/group/:group_id', auth, async (req, res) => {
        const group = await groupController.getGroup(req, res);
        res.send(group);
    })

    /**
     * Route to create a new group.
     * @name POST /group/create/
     * @function
     * @memberof module:routes/groupRoutes
     * @param {Object} req - The Express request object.
     * @param {Object} res - The Express response object.
     * @returns {Promise} A Promise that resolves to the result of the createGroup function.
     */
    .post('/group/create/', auth, async (req, res) => {
        const status = await groupController.createGroup(req, res);
        res.send(status);
    })

    /**
     * Route to delete all groups.
     * @name GET /group/deleteAll/
     * @function
     * @memberof module:routes/groupRoutes
     * @param {Object} req - The Express request object.
     * @param {Object} res - The Express response object.
     * @returns {Promise} A Promise that resolves to the result of the deleteAllGroups function.
     */
    .delete('/group/deleteAll/', auth, async (req, res) => {
        const status = await groupController.deleteAllGroups(req, res);
        res.send(status);
    });
};

module.exports = groupRoutes;