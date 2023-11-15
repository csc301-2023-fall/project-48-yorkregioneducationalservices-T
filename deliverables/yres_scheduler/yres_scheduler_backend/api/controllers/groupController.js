const groupService = require('../services/groupService');

function getGroup(req, res) {
    const group_id = req.body.group_id;

    const group = groupService.getGroup(group_id);

    return {
        group: group
    }
}

function getAllGroups(req, res) {
    const camp_id = req.body.camp_id;

    return groupService.getAllGroups(camp_id);
}

module.exports = {
    getGroup,
    getAllGroups
}