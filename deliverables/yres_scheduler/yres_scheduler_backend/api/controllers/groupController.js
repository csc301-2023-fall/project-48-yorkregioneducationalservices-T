const groupService = require('../services/groupService');

async function getGroup(req, res) {
    const group_id = req.body.group_id;

    const group = await groupService.getGroup(group_id);

    return {
        group: group
    };
}

async function getAllGroups(req, res) {
    const campus_id = req.body.campus_id;
    const allgroups = await groupService.getAllGroups(campus_id);

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

async function getGroupIDByScheduleId(req, res) {
    const schedule_id = req.body.schedule_id;
    const group_id = await groupService.getGroupIDByScheduleId(schedule_id);

    return {
        group_id: group_id
    };
}

async function createGroup(req, res) {
    const camp_id = req.body.camp_id;
    const status = await groupService.createGroup(camp_id);

    return {
        status: status ? 'Success' : 'failure'
    };
}

async function deleteAllGroups(req, res) {
    const status = await groupService.deleteAllGroups();

    return {
        status: status ? 'Success' : 'failure'
    };
}

module.exports = {
    getGroup,
    getAllGroups,
    getGroupIDByScheduleId,
    createGroup,
    deleteAllGroups
}