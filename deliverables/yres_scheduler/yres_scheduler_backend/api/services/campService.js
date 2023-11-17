
const db = require('../db/campDbPlugin');

/**
 * Retrieves a camp object by their ID.
 * @param {string} camp_id - The ID of the camp to retrieve.
 * @returns {object} - The camp object.
 */
function getCamp(camp_id) {
    var camp = db.getCampById(camp_id);

    return camp;

}

/**
 * Retrieves all camps from a campus from the database.
 *
 * @param {string} campus_id - The id of the campus under which to retrive the camps.
 * @returns {Promise<Array>} - A promise that resolves to an array of camp objects.
 */
async function getAllCamps(campus_id) {
    var all_camps = await db.getCampsByCampusId(campus_id);
    return all_camps;
}

/**
 * Creates a new camp in the database.
 *
 * @param {string} name - The name of the camp object to be created.
 * @param {string} campus_id - The id of the campus to create the new camp object under.
 * @returns {Promise<boolean>} - A promise that resolves to true if it successfully created camp object.
 */
function createCamp(name, campus_id) {
    var camp = db.createCamp(name, campus_id);
    return camp;
}

module.exports = {
    getCamp,
    getAllCamps,
    createCamp
}