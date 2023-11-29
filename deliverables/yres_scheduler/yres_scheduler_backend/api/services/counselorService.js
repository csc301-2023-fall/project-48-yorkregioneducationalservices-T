/**
 * This module implements the use case operations for the counselor service.
 * 
 * @module api/service/counselorService
 * 
 * @requires api/db/counselorDbPlugin
 * @requires api/entities/ServiceErrors
 */

const db = require('../db/counselorDbPlugin');
const { CounselorServiceError, STATUS_CODES } = require('../entities/ServiceErrors');

/**
 * Retrieves all counselors by campus ID.
 *
 * @param {number} campus_id - The ID of the campus to retrieve counselors for.
 * @returns {Array} - An array of counselor objects.
 */
async function getAllCounselors() {
    try {
        return await db.getAllCounselors();
    } catch(err) {
        throw new CounselorServiceError(
            `DB Operation Failure: ${err}`,
            STATUS_CODES.FAILED
        );
    }

}

/**
 * Creates a new counselor in the database.
 * @param {Object} counselor - The counselor object to be created.
 * @returns {Object} - The response object from the database.
 */
async function createCounselor(firstname, lastname, campus_id) {
    try {
        return await db.createCounselor(firstname, lastname, campus_id);
    } catch(err) {
        throw new CounselorServiceError(
            `DB Operation Failure: ${err}`,
            STATUS_CODES.FAILED
        );
    }
}

/**
 * Edits a counselor by their ID.
 *
 * @param {Object} counselor - The counselor object to be edited.
 * @returns {Object} - The response object from the database.
 */
async function editCounselorById(counselor_id, firstname, lastname) {
    try {
        return await db.editCounselorById(counselor_id, firstname, lastname);
    } catch(err) {
        throw new CounselorServiceError(
            `DB Operation Failure: ${err}`,
            STATUS_CODES.FAILED
        );
    }
}

/**
 * Deletes a counselor by their unique ID.
 * @param {string} counselor_ui_id - The unique ID of the counselor to be deleted.
 * @returns {boolean} - Whether the DB operation was successful
 */
async function deleteCounselorById(counselor_ui_id) {
    try {
        return await db.deleteCounselorById(counselor_ui_id);
    } catch(err) {
        throw new CounselorServiceError(
            `DB Operation Failure: ${err}`,
            STATUS_CODES.FAILED
        );
    }
}

module.exports = {
    getAllCounselors,
    createCounselor,
    editCounselorById,
    deleteCounselorById
}