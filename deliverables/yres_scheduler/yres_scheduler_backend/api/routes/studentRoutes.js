const studentService = require('../controllers/studentController');

module.exports = (app) => {
    app.get('/students/getAllStudentsByCampus/', (req, res) => {
        res.send(studentService.getAllStudentsByCampus(req, res));
    })
    .get('/students/getAllStudents/', async (req, res) => {
        const all_students = await studentService.getAllStudents(req, res)
        console.log(all_students);
        res.send(all_students);
    })
    .get('/students/getStudentById/', (req, res) => {
        res.send(studentService.getStudentById(req, res));
    })
    .get('/students/getStudentByUiId/', (req, res) => {
        res.send(studentService.getStudentByUiId(req, res));
    });
    

};