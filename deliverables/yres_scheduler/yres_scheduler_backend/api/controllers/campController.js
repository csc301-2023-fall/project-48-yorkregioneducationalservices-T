
const campService = require('../services/campService');

function getCamp(req, res) {
    const camp_id = req.body.camp_id;

    const camp = campService.getCamp(camp_id);

    return {
        camp: camp
    }
}

function getAllCamps(req, res) {
    const campus_id = req.body.campus_id;

    return campService.getAllCamps(campus_id);
}

module.exports = {
    getCamp,
    getAllCamps
}