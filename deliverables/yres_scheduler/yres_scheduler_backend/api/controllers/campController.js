
const campService = require('../services/campService');

async function getCamp(req, res) {
    const camp_id = req.body.camp_id;

    const camp = await campService.getCamp(camp_id)

    return {
        camp: camp
    };
}

async function getAllCamps(req, res) {
    const campus_id = req.body.campus_id;
    const allcamps = await campService.getAllCamps(campus_id);

    return {
        camps: allcamps
    };
}

module.exports = {
    getCamp,
    getAllCamps
}