const counselorService = require('../controllers/counselorController');
const { STATUS_CODES } = require('../entities/ServiceErrors');
const logger = require('../../logger');
const { log } = require('mathjs');

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
        logger.info(`GET /counselors/getAllCounselors/`);
        try{
            const result = await counselorService.getAllCounselors(req, res);
            res.status(STATUS_CODES.SUCCESS).send(result);
        }
        catch(error){
            logger.error(`Error in GET /counselors/getAllCounselors/: `, error);
            res.status(STATUS_CODES.FAILED).send( { result: null, status: STATUS_CODES.FAILED, error: error.message } );
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
        logger.info(`POST /counselors/createCounselor/`);
        try {
            const result = await counselorService.createCounselor(req, res);
            res.status(STATUS_CODES.SUCCESS).send(result);
            
        } catch (error) {
            logger.error(`Error in POST /counselors/createCounselor/: `, error);
            res.status(STATUS_CODES.FAILED).send( { result: null, status: STATUS_CODES.FAILED, error: error.message } );
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
        logger.info(`POST /counselors/editCounselorById/`);
        try {
            const result = await counselorService.editCounselorById(req, res);
            res.status(STATUS_CODES.SUCCESS).send(result);
        } catch (error) {
            logger.error(`Error in POST /counselors/editCounselorById/: `, error);
            res.status(STATUS_CODES.FAILED).send( { result: null, status: STATUS_CODES.FAILED, error: error.message } );
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
        logger.info(`POST /counselors/deleteCounselorById/`);
        try {
            const result = await counselorService.deleteCounselorById(req, res);
            res.status(STATUS_CODES.SUCCESS).send(result);
        } catch (error) {
            logger.error(`Error in POST /counselors/deleteCounselorById/: `, error);
            res.status(STATUS_CODES.FAILED).send( { result: null, status: STATUS_CODES.FAILED, error: error.message } );
        }
    })

};