const db = require('../db/studentDbPlugin');

/**
 * Retrieves all students from the database.
 *
 * @returns {Promise<Array>} A promise that resolves to an array of student objects.
 */
async function getAllStudents() {
    const resp = await db.getAllStudents();

    return resp;

}

/**
 * Retrieves a student object by their ID.
 * @param {number} student_id - The ID of the student to retrieve.
 * @returns {object} - The student object.
 */
function getStudentById(student_id) {
    const resp = db.getStudentById(student_id);

    return resp;

}

/**
 * Retrieves a student object from the database by their UI ID.
 *
 * @param {string} student_ui_id - The UI ID of the student to retrieve.
 * @returns {object} - The student object retrieved from the database.
 */
function getStudentByUiId(student_ui_id) {

    const resp = db.getStudentById(student_ui_id);

    return resp;

}

/**
 * Creates a new student in the database.
 *
 * @param {Object} student - The student object to be created.
 * @returns {Promise<Object>} - A promise that resolves to the newly created student object.
 */
function createStudent(student) {
    
    const resp = db.createStudent(student);
    return resp;
}

/**
 * Edits a student by their ID.
 * @param {Object} student - The student object to edit.
 * @returns {Object} - The response from the database.
 */
function editStudentById(student) {
    const resp = db.editStudentById(student);
    return resp;
}

/**
 * Adds a friend preference by the students's ui ID.
 * @param {Object} friends - The friends object to make friends.
 * @returns {Object} - The response from the database.
 */
function addFriendPreference(friends) {
    const resp = db.insertFriendPreferences(friends.student_id, friends.other_student_ui_id, friends.enemy);
    return resp;
}

/**
 * Deletes a student by their UI ID.
 * @param {string} student_ui_id - The UI ID of the student to delete.
 * @returns {Promise<boolean>} - A promise that resolves to a boolean indicating whether the student was successfully deleted.
 */
function deleteStudentById(student_ui_id) {
    const resp = db.deleteStudentById(student_ui_id);
    return resp;
}

module.exports = {
    getAllStudents,
    getStudentById,
    getStudentByUiId,
    createStudent,
    editStudentById,
    addFriendPreference,
    deleteStudentById
}