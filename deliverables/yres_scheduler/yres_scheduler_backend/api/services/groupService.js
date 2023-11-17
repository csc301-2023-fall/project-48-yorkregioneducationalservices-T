const db = require('../db/groupDbPlugin');

/**
 * Retrieves a group object by their ID.
 * @param {string} group_id - The ID of the group to retrieve.
 * @returns {object} - The group object.
 */
function getGroup(group_id) {
    var group = db.getGroupById(group_id);

    return group;

}

/**
 * Retrieves all groups under a given campus from the database.
 *
 * @returns {Promise<Array>} - A promise that resolves to an array of group objects.
 */
async function getAllGroups() {
    var all_groups = await db.getAllGroups();
    return all_groups;
}

/**
 * Creates a new group in the database.
 *
 * @param {string} camp_id - The id of the camp under which the group object is to be created.
 * @returns {Promise<boolean>} - A promise that resolves to true if the creation succeeded.
 */
function createGroup(camp_id) {
    var group = db.createGroup(camp_id);
    return group;
}

/**
 * Deletes all groups in the database.
 *
 * @returns {Promise<boolean>} - A promise that resolves to true if the deletion succeeded.
 */
function deleteAllGroups() {
    var group = db.deleteAllGroups();
    return group;
}


module.exports = {
    getGroup,
    getAllGroups,
    createGroup,
    deleteAllGroups
}