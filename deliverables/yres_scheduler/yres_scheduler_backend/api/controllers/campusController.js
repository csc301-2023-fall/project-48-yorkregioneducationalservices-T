const campusService = require('../services/campusService');

async function getCampus(req, res) {
    const campus_id = req.body.campus_id;

    const campus = await campusService.getCampus(campus_id);

    return {
        campus: campus
    }
}

async function getAllCampuses(req, res) {
    const allcampuses = await campusService.getAllCampuses()

    return {
        campuses: allcampuses
    };
}

module.exports = {
    getCampus,
    getAllCampuses
}