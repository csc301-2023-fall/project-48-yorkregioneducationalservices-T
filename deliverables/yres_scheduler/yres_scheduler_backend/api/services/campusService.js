const db = require('../db/campusDbPlugin');

/**
 * Retrieves a campus object by their ID.
 * @param {string} campus_id - The ID of the campus to retrieve.
 * @returns {object} - The campus object.
 */
async function getCampus(campus_id) {
    var campus = await db.getCampusById(campus_id);

    return campus;

}

/**
 * Retrieves all campuses from the database.
 *
 * @returns {Promise<Array>} - A promise that resolves to an array of campus objects.
 */
async function getAllCampuses() {
    var all_campuses = await db.getAllCampuses();
    return all_campuses;
}

/**
 * Creates a new campus in the database.
 *
 * @param {string} name - The name of the campus object to be created.
 * @returns {Promise<boolean>} - A promise that resolves to true if the campus object was created.
 */
function createCampus(name) {
    var campus = db.createCampus(name);
    return campus;
}

module.exports = {
    getCampus,
    getAllCampuses,
    createCampus
}