const studentService = require('../services/studentService');

function getStudents(req, res) {

    const student = studentService.getStudents();

    return {
        student: student
    }
}

module.exports = {
    getStudents
}