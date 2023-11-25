/**
 * This module implements the use case operations for the camp service.
 * 
 * @module api/service/campService
 * 
 * @requires api/db/campDbPlugin
 * @requires api/entities/ServiceErrors
 */

const db = require('../db/campDbPlugin');
const {CampServiceError, STATUS_CODES} = require('../entities/ServiceErrors');

/**
 * Retrieves a camp object by their ID.
 * @param {string} camp_id - The ID of the camp to retrieve.
 * @returns {object} - The camp object.
 */
async function getCamp(camp_id) {

    try {
        var camp = await db.getCampById(camp_id);

        if (camp == null) {
            throw new CampServiceError(
                `Camp resource with ID '${block_id}' not found in DB`,
                STATUS_CODES.NOT_FOUND
            );
        }

        return camp;
    } catch(err) {
        throw new CampServiceError(
            `DB Operation Failure: ${err}`,
            STATUS_CODES.FAILED
        );
    }

}

/**
 * Retrieves all camps from a campus from the database.
 *
 * @returns {Array<Camp>} - An array of camp objects.
 */
async function getAllCamps() {

    try {
        var all_camps = await db.getAllCamps();
        return all_camps;
    } catch(err) {
        throw new CampServiceError(
            `DB Operation Failure: ${err}`,
            STATUS_CODES.FAILED
        );
    }
}

/**
 * Creates a new camp in the database.
 *
 * @param {string} name - The name of the camp object to be created.
 * @param {string} campus_id - The id of the campus to create the new camp object under.
 * @returns {boolean} - Whether operation was successful.
 */
async function createCamp(name, campus_id) {

    try {
        return await db.createCamp(name, campus_id);
    } catch(err) {
        throw new BlockServiceError(
            `DB Operation Failure: ${err}`,
            STATUS_CODES.FAILED
        );
    }
}

module.exports = {
    getCamp,
    getAllCamps,
    createCamp
}