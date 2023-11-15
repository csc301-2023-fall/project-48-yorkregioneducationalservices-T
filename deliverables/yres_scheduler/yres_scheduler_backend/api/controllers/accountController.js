/**
 * This module implements the controller for requests for account service 
 * operations.
 * 
 * @module api/controllers/accountController
 * 
 * @requires api/services/accountService
 * @requires api/entities/ServiceErrors
 */

const accountService = require('../services/accountService');
const {STATUS_CODES} = require('../entities/ServiceErrors');

/**
 * Controller function for login operation.
 * 
 * @param {Object} req 
 * @param {Object} res 
 * @return {Object} The response body.
 */
function login(req, res) {
    const username = req.body.username;
    const password = req.body.password;

    const token = accountService.login(username, password);

    res.status(STATUS_CODES.SUCCESS);

    return {
        username: username,
        token: token
    };
}

/**
 * Controller function for sign operation.
 * 
 * @param {Object} req 
 * @param {Object} res 
 * @return {Object} The response body.
 */
function signup(req, res) {
    const username = req.body.username;
    const password = req.body.password;

    const token = accountService.signup(username, password);

    res.status(STATUS_CODES.SUCCESS);
    
    return {
        username: username,
        token: token
    };
}

module.exports = {
    login,
    signup
}