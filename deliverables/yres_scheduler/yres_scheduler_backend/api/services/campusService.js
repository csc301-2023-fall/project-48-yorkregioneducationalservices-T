const db = require('../db/psqlDbPlugin');

function getCampus(campus_id) {
    var campus = db.getCampusById(campus_id);

    return campus;

}

function getAllCampuses() {
    var all_campuses = db.getAllCampuses();
    return JSON.stringify(all_campuses);
}

module.exports = {
    getCampus,
    getAllCampuses
}