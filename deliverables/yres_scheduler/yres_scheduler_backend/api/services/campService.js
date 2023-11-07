
const db = require('../db/psqlDbPlugin');

function getCamp(camp_id) {
    var camp = db.getCampById(camp_id);

    return camp;

}

module.exports = {
    getCamp
}