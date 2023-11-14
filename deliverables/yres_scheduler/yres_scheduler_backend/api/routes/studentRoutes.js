const studentService = require('../controllers/studentController');

module.exports = (app) => {
    app.get('/students/getAllStudentsByCampus/', (req, res) => {
        studentService.getAllStudentsByCampus(req, res)
            .then((result) => {
                res.send(result);
            })
            .catch((error) => {
                res.status(500).send(error);
            });
    })
    .get('/students/getAllStudents/', async (req, res) => {
        try {
            const all_students = await studentService.getAllStudents(req, res);    
            res.send(all_students);
        } catch (error) {
            res.status(500).send(error);
        }
    })
    .get('/students/getStudentById/', (req, res) => {
        studentService.getStudentById(req, res)
            .then((result) => {
                res.send(result);
            })
            .catch((error) => {
                res.status(500).send(error);
            });
    })
    .get('/students/getStudentByUiId/', (req, res) => {
        studentService.getStudentByUiId(req, res)
            .then((result) => {
                res.send(result);
            })
            .catch((error) => {
                res.status(500).send(error);
            });
    })
    .post('/students/createStudent/', async (req, res) => {
        try {
            const resp = await studentService.createStudent(req, res);
            if (resp === true){
                res.status(200).send('Success');
            } else {
                res.status(200).send('Failure');
            }
            
        } catch (error) {
            res.status(500).send(error);
        }
    })
    .post('/students/editStudentById/', async (req, res) => {
        try {
            const resp = await studentService.editStudentById(req, res);
            res.send(resp);
            
        } catch (error) {
            console.log(error);
            res.status(500).send(error);
        }
    })
    .post('/students/deleteStudentById/', async (req, res) => {
        try {
            const resp = await studentService.deleteStudentById(req, res);
            res.send(resp);
            
        } catch (error) {
            console.log(error);
            res.status(500).send(error);
        }
    })

};