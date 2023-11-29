/**
 * This module specifies the routes for request endpoints in the student service.
 * 
 * @param {Object} [app] The express application
 * 
 * @module api/routes/studentRoutes
 * @requires api/controllers/studentController
 * @requires api/middleware/authHandler
 */

const studentController = require('../controllers/studentController');
const logger = require('../../logger');
const auth = require('../middleware/authHandler');

const studentRoutes = (app) => {
    /**
     * Route to get all students.
     * @name GET /student/all/
     * @function
     * @memberof module:routes/studentRoutes
     * @param {Object} req - The Express request object.
     * @param {Object} res - The Express response object.
     * @returns {Promise} A Promise that resolves to the result of the getAllStudents function.
     */
    app.get('/student/all/', auth, async (req, res) => {
        logger.info(`GET /student/all/`);
        const resp = await studentController.getAllStudents(req, res);
        res.send(resp);
    })
    /**
     * Route to get a student by ID.
     * @name GET /student/:student_id/
     * @function
     * @memberof module:routes/studentRoutes
     * @param {Object} req - The Express request object.
     * @param {Object} res - The Express response object.
     * @returns {Promise} A Promise that resolves to the result of the getStudentById function.
     */
    .get('/student/:student_id/', auth, async (req, res) => {
        logger.info(`GET /student/:student_id/`);
        const resp = await studentController.getStudentById(req, res);    
        res.send(resp);
    })
    /**
     * Route to get a student by UI ID.
     * @name GET /student/ui/:student_id
     * @function
     * @memberof module:routes/studentRoutes
     * @param {Object} req - The Express request object.
     * @param {Object} res - The Express response object.
     * @returns {Promise} A Promise that resolves to the result of the getStudentByUiId function.
     */

    .get('/student/ui/:student_id/', auth, async (req, res) => {
        logger.info(`GET /student/ui/:student_id/`);
        const resp = await studentController.getStudentByUiId(req, res);    
        res.send(resp);
    })
    /**
     * Route to create a new student.
     * @name POST /student/create/
     * @function
     * @memberof module:routes/studentRoutes
     * @param {Object} req - The Express request object.
     * @param {Object} res - The Express response object.
     * @returns {Promise} A Promise that resolves to a string indicating success or failure.
     */
    .post('/student/create/', auth, async (req, res) => {
        logger.info(`POST /student/create/`);
        const resp = await studentController.createStudent(req, res);    
        res.send(resp);
    })

/**
     * Route to create a new student from a json list.
     * @name POST /students/create/fromlist/
     * @function
     * @memberof module:routes/studentRoutes
     * @param {Object} req - The Express request object.
     * @param {Object} res - The Express response object.
     * @returns {Promise} A Promise that resolves to a string indicating success or failure.
     */
    .post('/students/create/fromlist/', auth, async (req, res) => {
        try {
            logger.info(`POST /students/create/fromlist/`);
            const resp = await studentController.createStudentsFromList(req, res);    
            res.status(resp.status).send(resp);
        } catch (error) {
            logger.error(`Error in GET /students/createStudentsFromList/: `, error);
            res.status(STATUS_CODES.FAILED).send({ result: null, status: STATUS_CODES.FAILED, error: error.message });
        }
    })

    /**
     * Route to edit a student by ID.
     * @name POST /student/edit/
     * @function
     * @memberof module:routes/studentRoutes
     * @param {Object} req - The Express request object.
     * @param {Object} res - The Express response object.
     * @returns {Promise} A Promise that resolves to the result of the editStudentById function.
     */
    .post('/student/:student_id/', auth, async (req, res) => {
        logger.info(`POST /student/edit/`);
        const resp = await studentController.editStudentById(req, res);
        res.send(resp);
    })
    /**
     * Route to delete a student by ID.
     * @name POST /student/:student_id/
     * @function
     * @memberof module:routes/studentRoutes
     * @param {Object} req - The Express request object.
     * @param {Object} res - The Express response object.
     * @returns {Promise} A Promise that resolves to the result of the deleteStudentById function.
     */
    .delete('/student/:student_id/', auth, async (req, res) => {
        logger.info(`POST /student/:student_id/`);
        const resp = await studentController.deleteStudentById(req, res);
        res.send(resp);
    })

};

module.exports = studentRoutes;