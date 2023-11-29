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
const {AccountServiceError, STATUS_CODES} = require('../entities/ServiceErrors');

/**
 * Controller function for login operation.
 * 
 * @param {Object} req 
 * @param {Object} res 
 * @return {Object} The response body.
 */
async function login(req, res) {
    const username = req.body.username;
    const password = req.body.password;

    // Check paramaters are valid
    if (!username || !password) {
        throw new AccountServiceError(
            `Invalid paramaters provided for request`,
            STATUS_CODES.INVALID
        );
    }

    const token = await accountService.login(username, password);

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
async function signup(req, res) {
    const username = req.body.username;
    const password = req.body.password;

    // Check paramaters are valid
    if (!username || !password) {
        throw new AccountServiceError(
            `Invalid paramaters provided for request`,
            STATUS_CODES.INVALID
        );
    }

    const token = await accountService.signup(username, password);

    res.status(STATUS_CODES.SUCCESS);
    
    return {
        username: username,
        token: token
    };
}

/** 
* Controller function for get login status operation.
* 
* @param {Object} req 
* @param {Object} res 
* @return {Object} The response body.
*/
async function getLoginStatus(req, res) {
    const header = req.headers["authorization"];
    var token = null

    if (typeof header !== "undefined") {
        token = header.split(" ")[1];
    }

    const isLoggedIn = await accountService.getLoginStatus(token);

   res.status(STATUS_CODES.SUCCESS);
   
   return {
       login_status: isLoggedIn
   };
}

module.exports = {
    login,
    signup,
    getLoginStatus
}