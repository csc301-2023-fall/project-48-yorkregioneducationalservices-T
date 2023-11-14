const db = require('../db/psqlDbPlugin');

function getAllStudentsByCampus(campus_id) {
    var students = db.getAllStudentsByCampus(campus_id);

    return students;

}

async function getAllStudents() {
    var students = await db.getAllStudents();

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

function createStudent(student) {
    const resp = db.createStudent(student);
    return resp;
}

function editStudentById(student) {
    const resp = db.editStudentById(student);
    return resp;
}

function deleteStudentById(student_ui_id) {
    const resp = db.deleteStudentById(student_ui_id);
    return resp;
}

module.exports = {
    getAllStudentsByCampus,
    getAllStudents,
    getStudentById,
    getStudentByUiId,
    createStudent,
    editStudentById,
    deleteStudentById
}