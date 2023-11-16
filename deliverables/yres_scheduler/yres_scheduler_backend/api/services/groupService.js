const db = require('../db/groupDbPlugin');

function getGroup(group_id) {
    var group = db.getGroupById(group_id);

    return group;

}

async function getAllGroups(campus_id) {
    var all_groups = await db.getGroupsByCampusId(campus_id);
    return all_groups;
}

async function getGroupIDByScheduleId(schedule_id) {
    var group_id = await db.getGroupIDByScheduleId(schedule_id);
    return group_id;
}

function createGroup(camp_id) {
    var group = db.createGroup(camp_id);
    return group;
}

function deleteAllGroups() {
    var group = db.deleteAllGroups();
    return group;
}


module.exports = {
    getGroup,
    getAllGroups,
    getGroupIDByScheduleId,
    createGroup,
    deleteAllGroups
}