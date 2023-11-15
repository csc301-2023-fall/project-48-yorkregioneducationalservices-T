/**
 * This module is a custom middleware for authenticating protected requests.
 * 
 * @param {Object} [req] The request object
 * @param {Object} [res] The response object
 * @param {function} [next] The next middleware to call
 * 
 * @module api/middleware/errorHandler
 */

/** @const {module} jwt JSON Web Token Package */
const jwt = require('jsonwebtoken');

/** @const {Object} [STATUS_CODES] Maps status labels to status codes. */
const {STATUS_CODES} = require('../entities/ServiceErrors');

const authHandler = (req, res, next) => {

    const header = req.headers["authorization"];
    
    if (typeof header !== "undefined") {
        const token = header.split(" ")[1];
        req.token = token;

        jwt.verify(req.token, "a wee secret key", (err, data) => {
            if (err) {
                res.sendStatus(STATUS_CODES.FORBIDDEN);
            } else {
                next();
            }
        })
    } else {
        res.sendStatus(STATUS_CODES.FORBIDDEN);
    }

}

module.exports = authHandler;