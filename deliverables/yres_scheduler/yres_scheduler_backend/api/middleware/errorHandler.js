/**
 * This module is a custom middleware for error handling. Implements the express
 * middleware interface for error handling.
 * 
 * @param {Error} [err] The error thrown by service operation
 * @param {Object} [req] The request object
 * @param {Object} [res] The response object
 * @param {function} [next] The next middleware to call
 * 
 * @module api/middleware/errorHandler
 */

const DEFAULT_STATUS_CODE = 500;

const errorHandler = (err, req, res, next) => {
    const status_code = err.status_code || DEFAULT_STATUS_CODE;
    res.status(status_code).send(
        {
            error: err.name,
            message: err.message,
            trace: err.stack
        }
    );
    next();

}

module.exports = errorHandler;