const groupService = require('../services/groupService');

async function getGroup(req, res) {
    const group_id = req.body.group_id;

    const group = await groupService.getGroup(group_id);

    return {
        group: group
    }
}

async function getAllGroups(req, res) {
    const camp_id = req.body.camp_id;
    const allgroups = await groupService.getAllGroups(camp_id);

    return {
        groups: allgroups
    };
}

module.exports = {
    getGroup,
    getAllGroups
}