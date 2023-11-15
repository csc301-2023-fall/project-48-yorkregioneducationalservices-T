/**
 * This module implements the use case operations for the account service operations.
 * 
 * @module api/service/AccountService
 * 
 * @requires ../db/psqlDbPlugin
 * @requires crypto
 * @requires bcrypt
 * @requires ../entities/ServiceErrors
 * @requires config
 * @requires jsonwebtoken
 */

const db = require('../db/psqlDbPlugin');
const crypto = require('crypto');
const bcrypt = require('bcrypt');
const {AccountServiceError, STATUS_CODES} = require('../entities/ServiceErrors');
const config = require('config');
const jwt = require('jsonwebtoken');
const AdminUser = require('../entities/AdminUser');

/**
 * Authorisation token config.
 * @const {string} [AUTH_TOKEN_SECRET] Secret for JWT signatures.
 * @const {number} [AUTH_TOKEN_EXPIRATION] Number of days until JWT expires.
 */
const AUTH_TOKEN_SECRET = process.env.AUTH_SECRET || config.get('auth.SECRET');
const AUTH_TOKEN_EXPIRATION = process.env.AUTH_EXPIRATION || config.get('auth.EXPIRATION');

/**
 * Generates token for admin user session if login credentials are valid.
 * 
 * @param {string} username Username for logging on user
 * @param {string} password Plaintext password for loggin on user
 * @returns {token} JWT for login session if credentials are valid
 */
function login(username, password) {

    if (!db.checkLogin(username, password)) {
        throw new AccountServiceError(
            "Invalid login credentials", 
            STATUS_CODES.UNAUTHORISED
        );
    } else {
        const curr_user = db.getAdminUserByName(username);
        const token = jwt.sign({user_id: curr_user.user_id}, AUTH_TOKEN_SECRET, {
            expiresIn: AUTH_TOKEN_EXPIRATION
        });
        return token;
    }
}

/**
 * Registers a new admin user with the provided credentials and logs
 * them in.
 * 
 * @param {string} username Username for logging on user
 * @param {string} password Plaintext password for loggin on user
 * @returns {token} JWT for login session for newly-registered user
 */
function signup(username, password) {
    if (db.existsUser) {
        throw new AccountServiceError(
            `User already exists for username '${username}'`, 
            STATUS_CODES.CONFLICT
        );
    }
    else {
        db.createAdminUser(username, password);
        return login(username, password);
    }
}


module.exports = {
    login,
    signup
}