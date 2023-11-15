const campusService = require('../services/campusService');

function getCampus(req, res) {
    const campus_id = req.body.campus_id;

    const campus = campusService.getCampus(campus_id);

    return {
        campus: campus
    }
}

function getAllCampuses(req, res) {
    return campusService.getAllCampuses();
}

module.exports = {
    getCampus,
    getAllCampuses
}