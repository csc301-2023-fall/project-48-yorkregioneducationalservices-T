const studentService = require('../controllers/studentController');

module.exports = (app) => {
    app.get('/students/getAllStudentsByCampus/', (req, res) => {
        res.send(studentService.getAllStudentsByCampus(req, res));
    })
    .get('/students/getAllStudents/', (req, res) => {
        res.send(studentService.getAllStudents(req, res));
    })
    .get('/students/getStudentById/', (req, res) => {
        res.send(studentService.getStudentById(req, res));
    })
    .get('/students/getStudentByUiId/', (req, res) => {
        res.send(studentService.getStudentByUiId(req, res));
    });
    

};