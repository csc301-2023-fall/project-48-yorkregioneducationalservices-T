const accountService = require('../controllers/accountController');

module.exports = (app) => {
    app.post('/account/login/', (req, res) => {
        res.send(accountService.login(req, res));
    })
    .post('/account/signup/', (req, res) => {
        res.send(accountService.signup(req, res));
    })
    .post('/account/logout/', (req, res) => {
        res.send(accountService.logout(req, res));
    });
};
