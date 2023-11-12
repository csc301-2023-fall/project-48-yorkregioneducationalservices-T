const campService = require('../services/studentService');

function getStudents(req, res) {

    const student = campService.getStudents();

    return {
        student: student
    }
}

module.exports = {
    getStudents
}