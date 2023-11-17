const groupService = require('../services/groupService');

/**
 * Retrieves a group by ID.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @returns {Object} - An object containing a group.
 */
async function getGroup(req, res) {
    const group_id = req.body.group_id;

    const group = await groupService.getGroup(group_id);

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
    const status = await groupService.createGroup(camp_id);

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