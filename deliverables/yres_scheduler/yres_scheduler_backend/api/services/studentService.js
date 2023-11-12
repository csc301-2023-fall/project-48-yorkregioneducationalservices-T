const db = require('../db/psqlDbPlugin');

function getStudents() {
    var student = db.getStudents();

    return student;

}

module.exports = {
    getStudents
}