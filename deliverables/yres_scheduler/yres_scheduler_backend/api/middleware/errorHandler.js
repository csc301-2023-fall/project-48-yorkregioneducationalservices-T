/**
 * This module is a custom middleware for error handling.
 * 
 * @param {*} [error] The error thrown by service operation
 * @param {*} [req] The request object
 * @param {*} [res] The response object
 * @param {*} [next] The next middleware to call
 * 
 * @module api/middleware/errorHandler
 */


/**
 * Implements Express error-handling middleware interface.
 *
 * @param {Error} error
 * @param {*} req
 * @param {*} res
 * @param {function} next
 */
const errorHandler = (error, req, res, next) => {

    res.status(err.status_code).send(
        {
            error: err.name,
            message: err.message,
            trace: err.stack
        }
    );
    next();

}

module.exports = errorHandler;