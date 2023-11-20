const counselorService = require('../controllers/counselorController');

/**
 * Defines the routes for counselor-related API endpoints.
 * @param {Object} app - The Express application object.
 */
module.exports = (app) => {
    /**
     * GET endpoint that retrieves all counselors by campus.
     * @name GET/counselors/getAllCounselors
     * @function
     * @memberof module:/routes/counselorRoutes
     * @param {Object} req - The Express request object.
     * @param {Object} res - The Express response object.
     * @returns {Promise} A Promise that resolves with the retrieved counselors or rejects with an error.
     */
    app.get('/counselors/getAllCounselors/', async (req, res) => {
        const result = await counselorService.getAllCounselors(req, res);
        res.send(result);
        try{

        }
        catch(error){
            res.status(500).send(error);
        }   
    })
    /**
     * POST endpoint that creates a new counselor.
     * @name POST/counselors/createCounselor
     * @function
     * @memberof module:/routes/counselorRoutes
     * @async
     * @param {Object} req - The Express request object.
     * @param {Object} res - The Express response object.
     * @returns {Promise} A Promise that resolves with a success message or rejects with an error.
     */
    .post('/counselors/createCounselor/', async (req, res) => {
        try {
            const resp = await counselorService.createCounselor(req, res);
            if (resp === true){
                res.status(200).send('Success');
            } else {
                res.status(200).send('Failure');
            }
            
        } catch (error) {
            res.status(500).send(error);
        }
    })
    /**
     * POST endpoint that edits an existing counselor by ID.
     * @name POST/counselors/editCounselorById
     * @function
     * @memberof module:/routes/counselorRoutes
     * @async
     * @param {Object} req - The Express request object.
     * @param {Object} res - The Express response object.
     * @returns {Promise} A Promise that resolves with the edited counselor or rejects with an error.
     */
    .post('/counselors/editCounselorById/', async (req, res) => {
        try {
            const resp = await counselorService.editCounselorById(req, res);
            res.send(resp);
            
        } catch (error) {
            console.log(error);
            res.status(500).send(error);
        }
    })
    /**
     * POST endpoint that deletes an existing counselor by ID.
     * @name POST/counselors/deleteCounselorById
     * @function
     * @memberof module:/routes/counselorRoutes
     * @async
     * @param {Object} req - The Express request object.
     * @param {Object} res - The Express response object.
     * @returns {Promise} A Promise that resolves with a success message or rejects with an error.
     */
    .post('/counselors/deleteCounselorById/', async (req, res) => {
        try {
            const resp = await counselorService.deleteCounselorById(req, res);
            res.send(resp);
            
        } catch (error) {
            console.log(error);
            res.status(500).send(error);
        }
    })

};