const db = require('../db/psqlDbPlugin');

function getGroup(group_id) {
    var group = db.getGroupById(group_id);

    return group;

}

function getAllGroups(camp_id) {
    var all_groups = db.getGroupsByCampId(camp_id);
    return JSON.stringify(all_groups);
}

module.exports = {
    getGroup,
    getAllGroups
}