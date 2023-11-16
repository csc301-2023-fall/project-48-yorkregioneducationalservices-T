const campusService = require('../services/campusService');

async function getCampus(req, res) {
    const campus_id = req.body.campus_id;

    const campus = await campusService.getCampus(campus_id);

    return {
        campus: campus
    };
}

async function getAllCampuses(req, res) {
    const allcampuses = await campusService.getAllCampuses();

    return {
        campuses: allcampuses.map((campus) => { 
            return {
                ...campus,
                camp_ids: campus.getCampIds(),
                room_ids: campus.getRoomIds()
            };
        })
    };
}

async function createCampus(req, res) {
    const name = req.body.name;
    const status = await campusService.createCampus(name);

    return {
        status: status ? 'Success' : 'failure'
    };
}

module.exports = {
    getCampus,
    getAllCampuses,
    createCampus
}