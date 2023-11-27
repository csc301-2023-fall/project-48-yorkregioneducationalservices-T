const campusService = require('../controllers/campusController');

module.exports = (app) => {

    /**
     * Route to get a campus by id.
     * @name GET /campus/get/
     * @function
     * @memberof module:routes/campusRoutes
     * @param {Object} req - The Express request object.
     * @param {Object} res - The Express response object.
     * @returns {Promise} A Promise that resolves to the result of the getCampus function.
     */
    /*
    app.get('/campus/get/', async (req, res) => {
        const campus = await campusService.getCampus(req, res);
        res.send(campus);
    })
    */
    
    /**
     * Route to get all campuses.
     * @name GET /campus/getAll/
     * @function
     * @memberof module:routes/campusRoutes
     * @param {Object} req - The Express request object.
     * @param {Object} res - The Express response object.
     * @returns {Promise} A Promise that resolves to the result of the getAllCampuses function.
     */
    app.get('/campus/getAll/', async (req, res) => {
        const all_campuses = await campusService.getAllCampuses(req, res);
        res.send(all_campuses);
    })
   
    /**
     * Route to create a new campus.
     * @name GET /campus/create/
     * @function
     * @memberof module:routes/campusRoutes
     * @param {Object} req - The Express request object.
     * @param {Object} res - The Express response object.
     * @returns {Promise} A Promise that resolves to the result of the createCampus function.
     */
    .post('/campus/create/', async (req, res) => {
        const status = await campusService.createCampus(req, res);
        res.status(200).send(status);
    });
};