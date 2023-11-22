const c = require('config');
const studentService = require('../services/studentService');
const {STATUS_CODES} = require('../entities/ServiceErrors');

/**
 * Retrieves all students.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @returns {Object} - An object containing an array of students with friend and enemy IDs.
 */
async function getAllStudents(req, res) {
    
    try {
        const all_students = await studentService.getAllStudents();
        if (all_students?.result === false) {
            return {
                status: STATUS_CODES.FAILED,
                error: all_students.error
            };
        }
        return {
            status: STATUS_CODES.SUCCESS,
            students: all_students.map((student) => { 
                return {
                    ...student,
                    friend_ids: student.getFriendIds(),
                    enemy_ids: student.getEnemyIds()
                };
            })
        };
    } catch (error) {
        return {
            status: STATUS_CODES.FAILED,
            error: error.message
        };
    }
    
}

/**
 * Retrieves a student by ID.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @returns {Object} - An object containing a student.
 */
function getStudentById(req, res) {

    try {
        const student_id = req.body.student_id;

        const student = studentService.getStudentById(student_id);
        if (student?.result === false) {
            return {
                status: STATUS_CODES.FAILED,
                error: student.error
            };
        }
        return {
            students: student,
            status: STATUS_CODES.SUCCESS
        };
    } catch (error) {
        return {
            status: STATUS_CODES.FAILED,
            error: error.message
        };
    }
}

/**
 * Retrieves a student by UI ID.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @returns {Object} - An object containing a student.
 */
function getStudentByUiId(req, res) {
    try {
        const stduent_ui_id = req.body.stduent_ui_id;

        const student = studentService.getStudentByUiId(stduent_ui_id);
        if (student?.result === false) {
            return {
                status: STATUS_CODES.FAILED,
                error: student.error
            };
        }
        return {
            status: STATUS_CODES.SUCCESS,
            students: student
        };
    } catch (error) {
        return {
            status: STATUS_CODES.FAILED,
            error: error.message
        };
    }
}

/**
 * Creates a new student.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @returns {Object} - An object containing a status message.
 */
async function createStudent(req, res) {
    
    const student = req.body;

    try {
        const status = await studentService.createStudent(student);
        
        if (status?.result === false) {
            return {
                status: STATUS_CODES.FAILED,
                error: status.error
            };
        } else {
            return {
                status: STATUS_CODES.SUCCESS,
            };
        }
    } catch (error) {
        return {
            status: STATUS_CODES.FAILED,
            error: error.message
        };
    }
}

/**
 * Edits a student by ID.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @returns {Object} - An object containing a status message.
 */
async function editStudentById(req, res) {

    try {
        const student = req.body;

        const status = await studentService.editStudentById(student);

        if (status?.result === false) {
            return {
                status: STATUS_CODES.FAILED,
                error: status.error
            };
        } else {
            return {
                status: STATUS_CODES.SUCCESS,
            };
        }
    } catch (error) {
        return {
            status: STATUS_CODES.FAILED,
            error: error.message
        };
    }
}

/**
 * Deletes a student by UI ID.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @returns {Object} - An object containing a status message.
 */
async function deleteStudentById(req, res) {
    try {
        const student_ui_id = req.body.student_ui_id;

        const status = await studentService.deleteStudentById(student_ui_id);

        if (status?.result === false) {
            return {
                status: STATUS_CODES.FAILED,
                error: status.error
            };
        } else {
            return {
                status: STATUS_CODES.SUCCESS,
            };
        }
    } catch (error) {
        return {
            status: STATUS_CODES.FAILED,
            error: error.message
        };
    }
}

module.exports = {
    getAllStudents,
    getStudentById,
    getStudentByUiId,
    createStudent,
    editStudentById,
    deleteStudentById
}