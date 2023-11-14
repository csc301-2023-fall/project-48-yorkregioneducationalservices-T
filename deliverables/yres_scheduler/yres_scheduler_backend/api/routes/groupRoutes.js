const groupService = require('../controllers/groupController');

module.exports = (app) => {
    app.get('/group/get', async (req, res) => {
        const group = await groupService.getGroup(req, res);
        res.send(group);
    })

    .get('/group/getall', async (req, res) => {
        const all_groups = await groupService.getAllGroups(req, res);
        res.send(all_groups);
    });
};