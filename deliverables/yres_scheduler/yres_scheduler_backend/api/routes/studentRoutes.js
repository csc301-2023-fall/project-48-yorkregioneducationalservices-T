const studentService = require('../controllers/studentController');

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
    .get('/students/getAllStudents/', async (req, res) => {
        try {
            const all_students = await studentService.getAllStudents(req, res);    
            res.send(all_students);
        } catch (error) {
            res.status(500).send(error);
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
    .get('/students/getStudentById/', (req, res) => {
        studentService.getStudentById(req, res)
            .then((result) => {
                res.send(result);
            })
            .catch((error) => {
                res.status(500).send(error);
            });
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
    .get('/students/getStudentByUiId/', (req, res) => {
        studentService.getStudentByUiId(req, res)
            .then((result) => {
                res.send(result);
            })
            .catch((error) => {
                res.status(500).send(error);
            });
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
            const resp = await studentService.createStudent(req, res);
            if (resp === true){
                res.status(200).send(resp);
            } else {
                res.status(200).send(resp);
            }
            
        } catch (error) {
            res.status(500).send(error);
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
            const resp = await studentService.editStudentById(req, res);
            res.send(resp);
            
        } catch (error) {
            console.log(error);
            res.status(500).send(error);
        }
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
            const resp = await studentService.deleteStudentById(req, res);
            res.send(resp);
            
        } catch (error) {
            console.log(error);
            res.status(500).send(error);
        }
    })

};