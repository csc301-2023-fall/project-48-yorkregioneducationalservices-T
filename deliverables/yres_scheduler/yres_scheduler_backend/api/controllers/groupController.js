/**
 * This module implements the controller for requests for group service 
 * operations.
 * 
 * @module api/controllers/groupController
 * 
 * @requires api/services/groupService
 * @requires api/entities/ServiceErrors
 */

const groupService = require('../services/groupService');
const {GroupServiceError, STATUS_CODES} = require('../entities/ServiceErrors');

/**
 * Retrieves a group by ID.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @returns {Object} - An object containing a group.
 */
async function getGroup(req, res) {
    const group_id = req.params.group_id;

    // Check paramaters are valid
    if (!group_id) {
        throw new GroupServiceError(
            `Invalid paramaters provided for request`,
            STATUS_CODES.INVALID
        );
    }

    const group = await groupService.getGroup(group_id);

    res.status(STATUS_CODES.SUCCESS);

    return {
        group: group
    };
}

/**
 * Retrieves all groups.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @returns {Object} - An object containing an array of groups with student and counselor ids.
 */
async function getAllGroups(req, res) {

    const allgroups = await groupService.getAllGroups();

    res.status(STATUS_CODES.SUCCESS);

    return {
        groups: allgroups.map((group) => { 
            return {
                ...group,
                student_ids: group.getStudentIds(),
                counselor_ids: group.getCounselorIds()
            };
        })
    };
}

/**
 * Creates a new group.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @returns {Object} - An object containing a status message.
 */
async function createGroup(req, res) {
    const camp_id = req.body.camp_id;

    // Check paramaters are valid
    if (!camp_id) {
        throw new GroupServiceError(
            `Invalid paramaters provided for request`,
            STATUS_CODES.INVALID
        );
    }

    const status = await groupService.createGroup(camp_id);

    res.status(STATUS_CODES.SUCCESS);

    return {
        status: status ? 'Success' : 'failure'
    };
}

/**
 * Deletes all groups.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @returns {Object} - An object containing a status message.
 */
async function deleteAllGroups(req, res) {
    const status = await groupService.deleteAllGroups();

    res.status(STATUS_CODES.SUCCESS);

    return {
        status: status ? 'Success' : 'failure'
    };
}

module.exports = {
    getGroup,
    getAllGroups,
    createGroup,
    deleteAllGroups
}