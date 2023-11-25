/**
 * This module implements the use case operations for the group service.
 * 
 * @module api/service/groupService
 * 
 * @requires api/db/groupDbPlugin
 * @requires api/entities/ServiceErrors
 */

const db = require('../db/groupDbPlugin');
const { GroupServiceError, STATUS_CODES } = require('../entities/ServiceErrors');

/**
 * Retrieves a group object by their ID.
 * @param {string} group_id - The ID of the group to retrieve.
 * @returns {object} - The group object.
 */
async function getGroup(group_id) {
    try {
        var group = await db.getGroupById(group_id);

        if (group == null) {
            throw new GroupServiceError(
                `Group resource with ID '${group_id}' not found in DB`,
                STATUS_CODES.NOT_FOUND
            );
        }

        return block;
    } catch(err) {
        throw new GroupServiceError(
            `DB Operation Failure: ${err}`,
            STATUS_CODES.FAILED
        );
    }

}

/**
 * Retrieves all groups under a given campus from the database.
 *
 * @returns {Array<Group>} - A promise that resolves to an array of group objects.
 */
async function getAllGroups() {
    try {
        return await db.getAllGroups();
    } catch(err) {
        throw new GroupServiceError(
            `DB Operation Failure: ${err}`,
            STATUS_CODES.FAILED
        );
    }
}

/**
 * Creates a new group in the database.
 *
 * @param {string} camp_id - The id of the camp under which the group object is to be created.
 * @returns {boolean} - A boolean that is true if the creation succeeded.
 */
async function createGroup(camp_id) {
    try {
        return await db.createGroup(camp_id);
    } catch(err) {
        throw new GroupServiceError(
            `DB Operation Failure: ${err}`,
            STATUS_CODES.FAILED
        );
    }
}

/**
 * Deletes all groups in the database.
 *
 * @returns {boolean} - A boolean that is true if the deletion succeeded.
 */
async function deleteAllGroups() {
    try {
        return await db.deleteAllBlocks();
    } catch(err) {
        throw new GroupServiceError(
            `DB Operation Failure: ${err}`,
            STATUS_CODES.FAILED
        );
    }
}


module.exports = {
    getGroup,
    getAllGroups,
    createGroup,
    deleteAllGroups
}