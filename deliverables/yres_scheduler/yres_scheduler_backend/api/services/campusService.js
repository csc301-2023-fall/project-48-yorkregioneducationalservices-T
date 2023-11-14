const db = require('../db/psqlDbPlugin');

function getCampus(campus_id) {
    var campus = db.getCampusById(campus_id);

    return campus;

}

function getAllCampuses() {
    var all_campuses = db.getAllCampuses();
    return all_campuses;
}

function createCampus(campus_id, name) {
    var campus = db.createCampus(campus_id, name);
    return campus;
}

module.exports = {
    getCampus,
    getAllCampuses,
    createCampus
}