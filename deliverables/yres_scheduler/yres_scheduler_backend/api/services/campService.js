
const db = require('../db/psqlDbPlugin');

function getCamp(camp_id) {
    var camp = db.getCampById(camp_id);

    return camp;

}

function getAllCamps(campus_id) {
    var all_camps = db.getCampsByCampusId(campus_id);
    return all_camps;
}

module.exports = {
    getCamp,
    getAllCamps
}