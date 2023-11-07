
const accountService = require('../services/accountService');

function login(req, res) {
    const username = req.body.username;
    const password = req.body.password;

    const login_status = accountService.login(username, password);

    return {
        login_status: login_status
    }
}

function signup(req, res) {
    const username = req.body.username;
    const password = req.body.password;

    const signup_status = accountService.signup(username, password);

    return {
        signup_status: signup_status
    }
}

function logout(req, res) {
    const userID = req.body.userID;

    const login_status = accountService.logout(userID);

    return {
        login_status: login_status
    }
}

module.exports = {
    login,
    signup,
    logout
}