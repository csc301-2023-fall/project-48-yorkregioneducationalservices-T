const groupService = require('../controllers/groupController');

module.exports = (app) => {

    /**
     * Route to get a group by id.
     * @name GET /group/get/
     * @function
     * @memberof module:routes/groupRoutes
     * @param {Object} req - The Express request object.
     * @param {Object} res - The Express response object.
     * @returns {Promise} A Promise that resolves to the result of the getGroup function.
     */
    app.get('/group/get/', async (req, res) => {
        const group = await groupService.getGroup(req, res);
        res.send(group);
    })

    /**
     * Route to get all groups.
     * @name GET /group/getAllByCampusID/
     * @function
     * @memberof module:routes/groupRoutes
     * @param {Object} req - The Express request object.
     * @param {Object} res - The Express response object.
     * @returns {Promise} A Promise that resolves to the result of the getAllGroups function.
     */
    .get('/group/getAllByCampusID/', async (req, res) => {
        const all_groups = await groupService.getAllGroups(req, res);
        res.send(all_groups);
    })

    /**
     * Route to create a new group.
     * @name GET /group/create/
     * @function
     * @memberof module:routes/groupRoutes
     * @param {Object} req - The Express request object.
     * @param {Object} res - The Express response object.
     * @returns {Promise} A Promise that resolves to the result of the createGroup function.
     */
    .post('/group/create/', async (req, res) => {
        const status = await groupService.createGroup(req, res);
        res.status(200).send(status);
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
    .delete('/group/deleteAll/', async (req, res) => {
        const status = await groupService.deleteAllGroups(req, res);
        res.status(200).send(status);
    });
};