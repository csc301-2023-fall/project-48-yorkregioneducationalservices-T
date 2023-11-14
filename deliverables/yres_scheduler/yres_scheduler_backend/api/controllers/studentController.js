const studentService = require('../services/studentService');

function getAllStudentsByCampus(req, res) {

    const campus_id = req.body.camp_id;

    const all_students_by_campus = studentService.getAllStudentsByCampus(campus_id);

    return {
        students: all_students_by_campus
    };
}

async function getAllStudents(req, res) {
    
    const all_students = await studentService.getAllStudents();

    return {
        students: all_students
    };
}

function getStudentById(req, res) {
    
    const student_id = req.body.student_id;

    const student = studentService.getStudentById(student_id);

    return {
        students: student
    };
}

function getStudentByUiId(req, res) {
    
    const stduent_ui_id = req.body.stduent_ui_id;

    const student = studentService.getStudentById(stduent_ui_id);

    return {
        students: student
    };
}



module.exports = {
    getAllStudentsByCampus,
    getAllStudents,
    getStudentById,
    getStudentByUiId
}