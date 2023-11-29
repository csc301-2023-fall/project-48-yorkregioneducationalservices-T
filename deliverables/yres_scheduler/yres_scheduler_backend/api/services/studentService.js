/**
 * This module implements the use case operations for the student service.
 * 
 * @module api/service/studentService
 * 
 * @requires api/db/studentDbPlugin
 * @requires api/entities/ServiceErrors
 */

const db = require('../db/studentDbPlugin');
const {StudentServiceError, STATUS_CODES} = require('../entities/ServiceErrors');

/**
 * Retrieves all students from the database.
 *
 * @returns {Array<Student>} An array of student objects.
 */
async function getAllStudents() {
    try {
        return await db.getAllStudents();
    } catch(err) {
        throw new StudentServiceError(
            `DB Operation Failure: ${err}`,
            STATUS_CODES.FAILED
        );
    }
}

/**
 * Retrieves a student object by their ID.
 * @param {number} student_id - The ID of the student to retrieve.
 * @returns {object} - The student object.
 */
async function getStudentById(student_id) {
    try {
        var student = await db.getStudentById(student_id);

        if (student == null) {
            throw new StudentServiceError(
                `Student resource with ID '${student_id}' not found in DB`,
                STATUS_CODES.NOT_FOUND
            );
        }

        return student;
    } catch(err) {
        throw new StudentServiceError(
            `DB Operation Failure: ${err}`,
            STATUS_CODES.FAILED
        );
    }

}

/**
 * Retrieves a student object from the database by their UI ID.
 *
 * @param {string} student_ui_id - The UI ID of the student to retrieve.
 * @returns {object} - The student object retrieved from the database.
 */
async function getStudentByUiId(student_ui_id) {

    try {
        var student = await db.getStudentById(student_ui_id);

        if (student == null) {
            throw new StudentServiceError(
                `Student resource with ID '${student_ui_id}' not found in DB`,
                STATUS_CODES.NOT_FOUND
            );
        }

        return student;
    } catch(err) {
        throw new StudentServiceError(
            `DB Operation Failure: ${err}`,
            STATUS_CODES.FAILED
        );
    }

}

/**
 * Creates a new student in the database.
 *
 * @param {Object} student - The student object to be created.
 * @returns {Object} - The newly created student object.
 */
async function createStudent(
    student_ui_id,
    firstname,
    lastname,
    age,
    sex) {
    try {
        const resp = await db.createStudent(
            student_ui_id,
            firstname,
            lastname,
            age,
            sex);
        return resp;
    } catch(err) {
        throw new StudentServiceError(
            `DB Operation Failure: ${err}`,
            STATUS_CODES.FAILED
        );
    }
}

/**
 * Edits a student by their ID.
 * @param {Object} student - The student object to edit.
 * @returns {Object} - The response from the database.
 */
async function editStudentById(
    student_id,
    student_ui_id,
    firstname,
    lastname,
    age,
    sex,
    enemy_ids,
    friend_ids) {
    try {
        const resp = await db.editStudentById(student_id,
            student_ui_id,
            firstname,
            lastname,
            age,
            sex,
            enemy_ids,
            friend_ids);
        return resp;
    } catch(err) {
        throw new StudentServiceError(
            `DB Operation Failure: ${err}`,
            STATUS_CODES.FAILED
        );
    }
    
}

/**
 * Deletes a student by their UI ID.
 * @param {string} student_ui_id - The UI ID of the student to delete.
 * @returns {Promise<boolean>} - A promise that resolves to a boolean indicating whether the student was successfully deleted.
 */
async function deleteStudentById(student_ui_id) {
    try {
        const resp = await db.deleteStudentById(student_ui_id);
    return resp;
    } catch(err) {
        throw new StudentServiceError(
            `DB Operation Failure: ${err}`,
            STATUS_CODES.FAILED
        );
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