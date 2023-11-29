/**
 * This module is a custom middleware for authenticating protected requests.
 * 
 * @param {Object} [req] The request object
 * @param {Object} [res] The response object
 * @param {function} [next] The next middleware to call
 * 
 * @module api/middleware/errorHandler
 * 
 * @requires jsonwebtoken
 * @requires api/entities/ServiceErrors
 * @requires config
 */

const jwt = require('jsonwebtoken');
const config = require('config');
const {STATUS_CODES} = require('../entities/ServiceErrors');

/** @const {string} [AUTH_TOKEN_SECRET] Secret for JWT signatures. */
const AUTH_TOKEN_SECRET = process.env.AUTH_SECRET || config.get('auth.SECRET');

/** @const {boolean} [AUTH_IS_ON] Indicates whether to authenticate protected endpoints. */
const AUTH_IS_ON = config.get('auth.IS_ON');

const authHandler = (req, res, next) => {

    if (AUTH_IS_ON) {
        const header = req.headers["authorization"];
        
        if (typeof header !== "undefined") {
            const token = header.split(" ")[1];
            req.token = token;

            jwt.verify(req.token, AUTH_TOKEN_SECRET, (err, data) => {
                if (err) {
                    res.sendStatus(STATUS_CODES.FORBIDDEN);
                } else {
                    next();
                }
            });
        } else {
            res.sendStatus(STATUS_CODES.FORBIDDEN);
        }
    } else {
        next();
    }

}

module.exports = authHandler;