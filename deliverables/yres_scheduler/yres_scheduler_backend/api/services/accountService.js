/**
 * This module implements the use case operations for the account service.
 * 
 * @module api/service/accountService
 * 
 * @requires api/db/psqlDbPlugin
 * @requires crypto
 * @requires bcrypt
 * @requires api/entities/ServiceErrors
 * @requires config
 * @requires jsonwebtoken
 */

const db = require('../db/accountDbPlugin');

const activityDB = require('../db/activityDbPlugin');
const counselorDB = require('../db/counselorDbPlugin');
const roomDB = require('../db/roomDbPlugin');
const scheduleDB = require('../db/scheduleDbPlugin');
const studentDB = require('../db/studentDbPlugin');
const groupDB = require('../db/groupDbPlugin');
const blockDB = require('../db/blockDbPlugin');

const bcrypt = require('bcrypt');
const {AccountServiceError, STATUS_CODES} = require('../entities/ServiceErrors');
const config = require('config');
const jwt = require('jsonwebtoken');
const saveJson = require('../utils/jsonToFile.js');
const AdminUser = require('../entities/AdminUser');

/**
 * Authorisation token config.
 * @const {string} [AUTH_TOKEN_SECRET] Secret for JWT signatures.
 * @const {number} [AUTH_TOKEN_EXPIRATION] Number of days until JWT expires.
 * @const {number} [AUTH_HASHING_SALT_ROUNDS] Number of salt rounds for password hashing.
 */
const AUTH_TOKEN_SECRET = process.env.AUTH_SECRET || config.get('auth.SECRET');
const AUTH_TOKEN_EXPIRATION = process.env.AUTH_EXPIRATION || config.get('auth.EXPIRATION');
const AUTH_HASHING_SALT_ROUNDS = process.env.SALT_ROUNDS || config.get('auth.SALT_ROUNDS');

/**
 * Generates token for admin user session if login credentials are valid.
 * 
 * @param {string} username Username for logging on user
 * @param {string} password Plaintext password for loggin on user
 * @returns {token} JWT for login session if credentials are valid
 */
async function login(username, password) {
    
    if (!(await db.checkLogin(username, password))) {
        throw new AccountServiceError(
            "Invalid login credentials", 
            STATUS_CODES.UNAUTHORISED
        );
    } else {
        const curr_user = await db.getAdminUserByName(username);
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
async function signup(username, password) {
    if (await db.existsUser(username)) {
        throw new AccountServiceError(
            `User already exists for username '${username}'`, 
            STATUS_CODES.CONFLICT
        );
    }
    else {
        const password_hash = await bcrypt.hash(password, AUTH_HASHING_SALT_ROUNDS);
        if(!(await db.createAdminUser(username, password_hash))) {
            throw new AccountServiceError(
                `Failed to create new admin user resource in DB for '${username}'`, 
                STATUS_CODES.FAILED
            );
        }
        return login(username, password);
    }
}

/**
 * Returns whether the user is logged in or not.
 * 
 * @param {token} token JWT for user session (may be null).
 * @returns {boolean} Whether user is logged in or not
 */
async function getLoginStatus(token) {
    if (token == null) {
        return false;
    } else {
        try {
            const decoded = jwt.verify(token, AUTH_TOKEN_SECRET);
            return true;
        } catch(err) {
            // Error indicates token is invalid
            return false;
        }
    }
}

/**
 * Delete all non campus/camp/account entities in the database.
 *  
 * @returns {boolean} - Whether operation succeeded
 */
async function clearDatabase() {
    try {
        var status = await blockDB.deleteAllBlocks();
        status = await activityDB.deleteAllActivities() && status;
        status = await counselorDB.deleteAllCounselors() && status;
        status = await roomDB.deleteAllRooms() && status;
        status = await scheduleDB.deleteAllSchedules() && status;
        status = await studentDB.deleteAllStudents() && status;
        status = await groupDB.deleteAllGroups() && status;

        saveJson.saveJsonToFile("[]", './saved_scheduled.json');

        status = await activityDB.resetActivityIds() && status;
        status = await counselorDB.resetCounselorIds() && status;
        status = await roomDB.resetRoomIds() && status;
        status = await scheduleDB.resetScheduleIds() && status;
        status = await studentDB.resetStudentIds() && status;
        status = await groupDB.resetGroupIds() && status;
        return await blockDB.resetBlockIds() && status;
    } catch(err) {
        throw new AccountServiceError(
            `DB Operation Failure: ${err}`,
            STATUS_CODES.FAILED
        );
    }
}

module.exports = {
    login,
    signup,
    getLoginStatus,
    clearDatabase
}