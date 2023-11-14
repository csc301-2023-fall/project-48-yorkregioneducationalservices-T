const groupService = require('../controllers/groupController');

module.exports = (app) => {
    app.get('/group/get', (req, res) => {
        res.send(groupService.getGroup(req, res));
    })

    .get('/group/getall', (req, res) => {
        res.send(groupService.getAllGroups(req, res));
    });
};