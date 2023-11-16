const groupService = require('../controllers/groupController');

module.exports = (app) => {
    app.get('/group/get/', async (req, res) => {
        const group = await groupService.getGroup(req, res);
        res.send(group);
    })

    .get('/group/getAllByCampusID/', async (req, res) => {
        const all_groups = await groupService.getAllGroups(req, res);
        res.send(all_groups);
    })

    .post('/group/create/', async (req, res) => {
        const status = await groupService.createGroup(req, res);
        res.status(200).send(status);
    })

    .delete('/group/deleteAll/', async (req, res) => {
        const status = await groupService.deleteAllGroups(req, res);
        res.status(200).send(status);
    });
};