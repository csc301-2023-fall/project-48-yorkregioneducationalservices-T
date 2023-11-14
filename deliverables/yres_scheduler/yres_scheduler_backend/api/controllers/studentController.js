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
        students: all_students.map((student) => { 
            return {
                ...student,
                friend_ids: student.getFriendIds(),
                enemy_ids: student.getEnemyIds()
            };
        })
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

async function createStudent(req, res) {
    
    const student = req.body;

    const status = await studentService.createStudent(student);

    return {
        status: status ? 'Success' : 'failure'
    }
}

async function editStudentById(req, res) {

    const student = req.body;

    const status = await studentService.editStudentById(student);

    return {
        status: status ? 'Success' : 'failure'
    }
}

async function deleteStudentById(req, res) {
    
        const student_ui_id = req.body.student_ui_id;
    
        const status = await studentService.deleteStudentById(student_ui_id);
    
        return {
            status: status ? 'Success' : 'failure'
        }
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