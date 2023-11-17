const campService = require('../controllers/campController');

module.exports = (app) => {

    /**
     * Route to get a camp by id.
     * @name GET /camp/get/
     * @function
     * @memberof module:routes/campRoutes
     * @param {Object} req - The Express request object.
     * @param {Object} res - The Express response object.
     * @returns {Promise} A Promise that resolves to the result of the getCamp function.
     */
    app.get('/camp/get/', async (req, res) => {
        const camp = await campService.getCamp(req, res);
        res.send(camp);
    })

    /**
     * Route to get all camps.
     * @name GET /camp/getAll/
     * @function
     * @memberof module:routes/campRoutes
     * @param {Object} req - The Express request object.
     * @param {Object} res - The Express response object.
     * @returns {Promise} A Promise that resolves to the result of the getAllCamps function.
     */
    .get('/camp/getAll/', async (req, res) => {
        const all_camps = await campService.getAllCamps(req, res);
        res.send(all_camps);
    })

    /**
     * Route to create a new camp.
     * @name GET /camp/create/
     * @function
     * @memberof module:routes/campRoutes
     * @param {Object} req - The Express request object.
     * @param {Object} res - The Express response object.
     * @returns {Promise} A Promise that resolves to the result of the createCamp function.
     */
    .post('/camp/create/', async (req, res) => {
        const status = await campService.createCamp(req, res);
        res.status(200).send(status);
    });
};