const db = require('../db/counselorDbPlugin');

/**
 * Retrieves all counselors by campus ID.
 *
 * @param {number} campus_id - The ID of the campus to retrieve counselors for.
 * @returns {Array} - An array of counselor objects.
 */
async function getAllCounselors() {
    var counselors = await db.getAllCounselors();
    return counselors;

}

/**
 * Creates a new counselor in the database.
 * @param {Object} counselor - The counselor object to be created.
 * @returns {Object} - The response object from the database.
 */
function createCounselor(counselor) {
    const resp = db.createCounselor(counselor);
    return resp;
}

/**
 * Edits a counselor by their ID.
 *
 * @param {Object} counselor - The counselor object to be edited.
 * @returns {Object} - The response object from the database.
 */
function editCounselorById(counselor) {
    const resp = db.editCounselorById(counselor);
    return resp;
}

/**
 * Deletes a counselor by their unique ID.
 * @param {string} counselor_ui_id - The unique ID of the counselor to be deleted.
 * @returns {Promise<boolean>} - A Promise that resolves to a boolean indicating whether the deletion was successful.
 */
function deleteCounselorById(counselor_ui_id) {
    const resp = db.deleteCounselorById(counselor_ui_id);
    return resp;
}

module.exports = {
    getAllCounselors,
    createCounselor,
    editCounselorById,
    deleteCounselorById
}