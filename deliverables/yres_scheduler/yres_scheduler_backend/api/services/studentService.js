const db = require('../db/psqlDbPlugin');

function getAllStudentsByCampus(campus_id) {
    var students = db.getAllStudentsByCampus(campus_id);

    return students;

}

function getAllStudents() {
    var students = db.getAllStudents();

    return students;

}

function getStudentById(student_id) {
    var student = db.getStudentById(student_id);

    return student;

}

function getStudentByUiId(student_ui_id) {
    var student = db.getStudentById(student_ui_id);

    return student;

}


module.exports = {
    getAllStudentsByCampus,
    getAllStudents,
    getStudentById,
    getStudentByUiId
}