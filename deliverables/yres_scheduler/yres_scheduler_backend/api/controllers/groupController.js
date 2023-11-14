const groupService = require('../services/groupService');

async function getGroup(req, res) {
    const group_id = req.body.group_id;

    const group = await groupService.getGroup(group_id)

    return {
        group: group
    };
}

async function getAllGroups(req, res) {
    const campus_id = req.body.campus_id;
    const allgroups = await groupService.getAllGroups(campus_id)

    return {
        groups: allgroups
    };
}

module.exports = {
    getGroup,
    getAllGroups
}