
const db = require('../db/campDbPlugin');

function getCamp(camp_id) {
    var camp = db.getCampById(camp_id);

    return camp;

}

async function getAllCamps(campus_id) {
    var all_camps = await db.getCampsByCampusId(campus_id);
    return all_camps;
}

function createCamp(name, campus_id) {
    var camp = db.createCamp(name, campus_id);
    return camp;
}

module.exports = {
    getCamp,
    getAllCamps,
    createCamp
}