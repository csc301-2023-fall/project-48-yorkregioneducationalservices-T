/**
 * This module implements the controller for requests for student service 
 * operations.
 * 
 * @module api/controllers/studentController
 * 
 * @requires api/services/studentService
 * @requires api/entities/ServiceErrors
 */

const c = require('config');
const studentService = require('../services/studentService');
const {StudentServiceError, STATUS_CODES} = require('../entities/ServiceErrors');
const logger = require('../../logger');

/**
 * Retrieves all students.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @returns {Object} - An object containing an array of students with friend and enemy IDs.
 */
async function getAllStudents(req, res) {
    
    const all_students = await studentService.getAllStudents();

    res.status(STATUS_CODES.SUCCESS);

    return {
        result: all_students.map((student) => { 
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

    // Check paramaters are valid
    if (!student_id) {
        throw new StudentServiceError(
            `Invalid paramaters provided for request`,
            STATUS_CODES.INVALID
        );
    }

    const student = studentService.getStudentById(student_id);

    res.status(STATUS_CODES.SUCCESS);
    
    return {
        result: student
    };
}

/**
 * Retrieves a student by UI ID.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @returns {Object} - An object containing a student.
 */
function getStudentByUiId(req, res) {
    const student_ui_id = req.params.student_id;

    if (!student_ui_id) {
        throw new StudentServiceError(
            `Invalid paramaters provided for request`,
            STATUS_CODES.INVALID
        );
    }

    const student = studentService.getStudentByUiId(student_ui_id);

    res.status(STATUS_CODES.SUCCESS);

    return {
        result: student
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

    if (!student) {
        throw new StudentServiceError(
            `Invalid paramaters provided for request`,
            STATUS_CODES.INVALID
        );
    }

    const status = await studentService.createStudent(student);

    res.status(STATUS_CODES.SUCCESS);
    
    return {
        status: status
    };

}

/**
 * Creates a new student.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @returns {Object} - An object containing a status message.
 */
async function createStudentsFromList(req, res) {
        
    const students = req.body;
    logger.debug(`createStudentsFromList: `, students);

    const failed_students = []; // Initialize an array to store failed student IDs

    await Promise.all(students.map(async student => {
        const status = await studentService.createStudent(student);
        if (status?.result === false) {
            logger.error(`createStudentsFromList: Failed to create student ${student.student_ui_id} with error: ${status.error}`)
            failed_students.push(student.student_ui_id); 
        }
    }));

    return {
        status: failed_students.length === 0 ? STATUS_CODES.SUCCESS : STATUS_CODES.FAILED,
        error: { failed_students: failed_students} // Return the list of failed student IDs
    };
}
/**
 * Edits a student by ID.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @returns {Object} - An object containing a status message.
 */
async function editStudentById(req, res) {

    const student = req.body;

    if (!student) {
        throw new StudentServiceError(
            `Invalid paramaters provided for request`,
            STATUS_CODES.INVALID
        );
    }

    const status = await studentService.editStudentById(student);

    res.status(STATUS_CODES.SUCCESS);

    return {
        status: status
    };
}

/**
 * Deletes a student by UI ID.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @returns {Object} - An object containing a status message.
 */
async function deleteStudentById(req, res) {
    const student_ui_id = req.params.student_id;

    if (!student_ui_id) {
        throw new StudentServiceError(
            `Invalid paramaters provided for request`,
            STATUS_CODES.INVALID
        );
    }

    const status = await studentService.deleteStudentById(student_ui_id);

    res.status(STATUS_CODES.SUCCESS);

    return {
        status: status
    };
}

module.exports = {
    getAllStudents,
    getStudentById,
    getStudentByUiId,
    createStudent,
    createStudentsFromList,
    editStudentById,
    deleteStudentById
}