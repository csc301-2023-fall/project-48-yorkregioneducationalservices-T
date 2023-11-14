const studentService = require('../services/studentService');

/**
 * Retrieves all students by campus ID.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @returns {Object} - An object containing an array of students.
 */
function getAllStudentsByCampus(req, res) {

    const campus_id = req.body.camp_id;

    const all_students_by_campus = studentService.getAllStudentsByCampus(campus_id);

    return {
        students: all_students_by_campus
    };
}

/**
 * Retrieves all students.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @returns {Object} - An object containing an array of students with friend and enemy IDs.
 */
async function getAllStudents(req, res) {
    
    const all_students = await studentService.getAllStudents();

    return {
        students: all_students.map((student) => { 
            return {
                ...student,
                friend_ids: student.getFriendIds(),
                enemy_ids: student.getEnemyIds()
            };
        })
    };
    
}

/**
 * Retrieves a student by ID.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @returns {Object} - An object containing a student.
 */
function getStudentById(req, res) {
    
    const student_id = req.body.student_id;

    const student = studentService.getStudentById(student_id);

    return {
        students: student
    };
}

/**
 * Retrieves a student by UI ID.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @returns {Object} - An object containing a student.
 */
function getStudentByUiId(req, res) {
    
    const stduent_ui_id = req.body.stduent_ui_id;

    const student = studentService.getStudentById(stduent_ui_id);

    return {
        students: student
    };
}

/**
 * Creates a new student.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @returns {Object} - An object containing a status message.
 */
async function createStudent(req, res) {
    
    const student = req.body;

    const status = await studentService.createStudent(student);

    return {
        status: status ? 'Success' : 'failure'
    }
}

/**
 * Edits a student by ID.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @returns {Object} - An object containing a status message.
 */
async function editStudentById(req, res) {

    const student = req.body;

    const status = await studentService.editStudentById(student);

    return {
        status: status ? 'Success' : 'failure'
    }
}

/**
 * Deletes a student by UI ID.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @returns {Object} - An object containing a status message.
 */
async function deleteStudentById(req, res) {
    
    const student_ui_id = req.body.student_ui_id;

    const status = await studentService.deleteStudentById(student_ui_id);

    return {
        status: status ? 'Success' : 'failure'
    }
}

module.exports = {
    getAllStudentsByCampus,
    getAllStudents,
    getStudentById,
    getStudentByUiId,
    createStudent,
    editStudentById,
    deleteStudentById
}