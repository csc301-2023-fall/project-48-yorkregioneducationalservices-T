
const campService = require('../services/campService');

function getCamp(req, res) {
    const camp_id = req.body.camp_id;

    const camp = campService.getCamp(camp_id);

    return {
        camp: camp
    }
}

module.exports = {
    getCamp
}