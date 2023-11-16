const db = require('../db/campusDbPlugin');

async function getCampus(campus_id) {
    var campus = await db.getCampusById(campus_id);

    return campus;

}

async function getAllCampuses() {
    var all_campuses = await db.getAllCampuses();
    return all_campuses;
}

function createCampus(name) {
    var campus = db.createCampus(name);
    return campus;
}

module.exports = {
    getCampus,
    getAllCampuses,
    createCampus
}