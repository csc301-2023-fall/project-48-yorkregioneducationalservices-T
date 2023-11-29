const studentService = require('../controllers/studentController');
const logger = require('../../logger');
const {STATUS_CODES} = require('../entities/ServiceErrors');
const { log } = require('mathjs');

/**
 * Defines the routes for student-related API endpoints.
 * @param {Object} app - The Express application object.
 */
module.exports = (app) => {
    /**
     * Route to get all students.
     * @name GET /students/getAllStudents/
     * @function
     * @memberof module:routes/studentRoutes
     * @param {Object} req - The Express request object.
     * @param {Object} res - The Express response object.
     * @returns {Promise} A Promise that resolves to the result of the getAllStudents function.
     */
    app.get('/students/getAllStudents/', async (req, res) => {
        try {
            logger.info(`GET /students/getAllStudents/`);
            const resp = await studentService.getAllStudents(req, res);
            res.status(resp.status).send(resp);
        } catch (error) {
            logger.error(`Error in GET /students/getAllStudents/: `, error);
            res.status(STATUS_CODES.FAILED).send( { result: null, status: STATUS_CODES.FAILED, error: error.message });
        }
    })
    /**
     * Route to get a student by ID.
     * @name GET /students/getStudentById/
     * @function
     * @memberof module:routes/studentRoutes
     * @param {Object} req - The Express request object.
     * @param {Object} res - The Express response object.
     * @returns {Promise} A Promise that resolves to the result of the getStudentById function.
     */
    .get('/students/getStudentById/', async (req, res) => {
        try {
            logger.info(`GET /students/getStudentById/`);
            const resp = await studentService.getStudentById(req, res);    
            res.status(resp.status).send(resp);
        } catch (error) {
            logger.error(`Error in GET /students/getStudentById/: `, error);
            res.status(STATUS_CODES.FAILED).send( { result: null, status: STATUS_CODES.FAILED, error: error.message });
        }
    })
    /**
     * Route to get a student by UI ID.
     * @name GET /students/getStudentByUiId/
     * @function
     * @memberof module:routes/studentRoutes
     * @param {Object} req - The Express request object.
     * @param {Object} res - The Express response object.
     * @returns {Promise} A Promise that resolves to the result of the getStudentByUiId function.
     */

    .get('/students/getStudentByUiId/', async (req, res) => {
        try {
            logger.info(`GET /students/getStudentByUiId/`);
            const resp = await studentService.getStudentByUiId(req, res);    
            res.status(resp.status).send(resp);
        } catch (error) {
            logger.error(`Error in GET /students/getStudentByUiId/: `, error);
            res.status(STATUS_CODES.FAILED).send({ result: null, status: STATUS_CODES.FAILED, error: error.message });
        }
    })
    /**
     * Route to create a new student.
     * @name POST /students/createStudent/
     * @function
     * @memberof module:routes/studentRoutes
     * @param {Object} req - The Express request object.
     * @param {Object} res - The Express response object.
     * @returns {Promise} A Promise that resolves to a string indicating success or failure.
     */
    .post('/students/createStudent/', async (req, res) => {
        try {
            logger.info(`POST /students/createStudent/`);
            const resp = await studentService.createStudent(req, res);    
            res.status(resp.status).send(resp);
        } catch (error) {
            logger.error(`Error in GET /students/getStudentByUiId/: `, error);
            res.status(STATUS_CODES.FAILED).send({ result: null, status: STATUS_CODES.FAILED, error: error.message });
        }
    })

/**
     * Route to create a new student from a json list.
     * @name POST /students/createStudentsFromList/
     * @function
     * @memberof module:routes/studentRoutes
     * @param {Object} req - The Express request object.
     * @param {Object} res - The Express response object.
     * @returns {Promise} A Promise that resolves to a string indicating success or failure.
     */
    .post('/students/createStudentsFromList/', async (req, res) => {
        try {
            logger.info(`POST /students/createStudentsFromList/`);
            const resp = await studentService.createStudentsFromList(req, res);    
            res.status(resp.status).send(resp);
        } catch (error) {
            logger.error(`Error in GET /students/createStudentsFromList/: `, error);
            res.status(STATUS_CODES.FAILED).send({ result: null, status: STATUS_CODES.FAILED, error: error.message });
        }
    })

    /**
     * Route to edit a student by ID.
     * @name POST /students/editStudentById/
     * @function
     * @memberof module:routes/studentRoutes
     * @param {Object} req - The Express request object.
     * @param {Object} res - The Express response object.
     * @returns {Promise} A Promise that resolves to the result of the editStudentById function.
     */
    .post('/students/editStudentById/', async (req, res) => {
        try {
            logger.info(`POST /students/editStudentById/`);
            const resp = await studentService.editStudentById(req, res);
            res.status(resp.status).send(resp);
        } catch (error) {
            logger.error('Error in POST /students/editStudentById/: ', error);
            res.status(STATUS_CODES.FAILED).send({ result: null, status: STATUS_CODES.FAILED, error: error.message });
        }
    })

    /**
     * Route to add a friend preference by Id.
     * @name POST /students/editStudentById/
     * @function
     * @memberof module:routes/studentRoutes
     * @param {Object} req - The Express request object.
     * @param {Object} res - The Express response object.
     * @returns {Promise} A Promise that resolves to the result of the editStudentById function.
     */
    .post('/students/createFriends/', async (req, res) => {
        logger.info(`POST /student/createFriends/`);
        const resp = await studentService.addFriendPreference(req, res);
        res.send(resp);
    })

    /**
     * Route to delete a student by ID.
     * @name POST /students/deleteStudentById/
     * @function
     * @memberof module:routes/studentRoutes
     * @param {Object} req - The Express request object.
     * @param {Object} res - The Express response object.
     * @returns {Promise} A Promise that resolves to the result of the deleteStudentById function.
     */
    .post('/students/deleteStudentById/', async (req, res) => {
        try {
            logger.info(`POST /students/deleteStudentById/`);
            const resp = await studentService.deleteStudentById(req, res);
            res.status(resp.status).send(resp);
        } catch (error) {
            logger.error(`Error in POST /students/deleteStudentById/:`, error);
            res.status(STATUS_CODES.FAILED).send({ result: null, status: STATUS_CODES.FAILED, error: error.message });
        }
    })

};