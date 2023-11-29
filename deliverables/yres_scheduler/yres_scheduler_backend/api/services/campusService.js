/**
 * This module implements the use case operations for the campus service.
 * 
 * @module api/service/campusService
 * 
 * @requires api/db/campusDbPlugin
 * @requires api/entities/ServiceErrors
 */

const db = require('../db/campusDbPlugin');
const {CampusServiceError, STATUS_CODES} = require('../entities/ServiceErrors');

/**
 * Retrieves a campus object by their ID.
 * 
 * @param {number} campus_id The ID for the campus.
 * @returns {object} - The campus object.
 */
async function getCampus(campus_id) {

    try {
        var campus = await db.getCampusById(campus_id);

        if (campus == null) {
            throw new CampusServiceError(
                `Campus resource with ID '${block_id}' not found in DB`,
                STATUS_CODES.NOT_FOUND
            );
        }

        return campus;
    } catch(err) {
        throw new CampusServiceError(
            `DB Operation Failure: ${err}`,
            STATUS_CODES.FAILED
        );
    }
}

/**
 * Retrieves all campuses from the database.
 *
 * @returns {Array<Campus>} - An array of campus objects.
 */
async function getAllCampuses() {
    try {
        return await db.getAllCampuses();
    } catch(err) {
        throw new CampusServiceError(
            `DB Operation Failure: ${err}`,
            STATUS_CODES.FAILED
        );
    }
}

/**
 * Creates a new campus in the database.
 *
 * @param {string} name - The name of the campus object to be created.
 * @returns {Promise<boolean>} - A promise that resolves to true if the campus object was created.
 */
async function createCampus(name) {
    try {
        return await db.createCampus(name);
    } catch(err) {
        throw new CampusServiceError(
            `DB Operation Failure: ${err}`,
            STATUS_CODES.FAILED
        );
        }
}

module.exports = {
    getCampus,
    getAllCampuses,
    createCampus
}