const db = require('../db/psqlDbPlugin');

function getGroup(group_id) {
    var group = db.getGroupById(group_id);

    return group;

}

function getAllGroups(campus_id) {
    var all_groups = db.getGroupsByCampusId(campus_id);
    return all_groups;
}

module.exports = {
    getGroup,
    getAllGroups
}