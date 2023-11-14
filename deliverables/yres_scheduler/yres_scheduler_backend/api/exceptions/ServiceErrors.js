/**
 * This module contains custom error classes to represent errors that occur in service 
 * module operations.
 * 
 * @module ServiceErrors
 */

/** @const {number} DEFAULT_STATUS_CODE The default status code for errors. */
const DEFAULT_STATUS_CODE = 500;

/**
 * ServiceError is a child of the Error class and represents an error that has occured 
 * in a Service operation. It stores a descriptive message and the status code corresponding 
 * to this error.
 * 
 * @extends Error
 */
class ServiceError extends Error {

    /**
     * Create a Service Error.
     * @param {string} [message] A descriptive message for the error.
     * @param {number} [status_code = DEFAULT_STATUS_CODE] The corresponding status code for this error.
     */
    constructor(message, status_code = DEFAULT_STATUS_CODE) {
        super(message);
        this.name = this.constructor.name;
        Error.captureStackTrace(this, this.constructor);
        this.status_code = status_code;
    }

    /**
     * Get the status code for this error.
     * @return {number} The status code for this error.
     */
    get status_code() {
        return this.status_code;
    }

    /**
     * Set the status code for this error.
     * @param {number} [new_status_code] The new status code for this error.
     */
    set status_code(new_status_code) {
        this.status_code = new_status_code;
    }

    /**
     * Get the message for this error.
     * @return {string} The descriptive message for this error.
     */
    get message() {
        return this.message;
    }

    /**
     * Set the message for this error.
     * @param {string} [new_message] The new message for this error.
     */
    set message(new_message) {
        this.message = new_message;
    }
}

/**
 * AccountServiceError extends the ServiceError class and represents an error that has occured 
 * in an Account Service operation. It stores a descriptive message and the status code 
 * corresponding to this error.
 * 
 * @extends ServiceError
 */
class AccountServiceError extends ServiceError {
    
    /**
     * Create an Account Service Error.
     * @param {string} [message] A descriptive message for the error.
     * @param {number} [status_code = DEFAULT_STATUS_CODE] The corresponding status code for this error.
     */
    constructor(message, status_code = DEFAULT_STATUS_CODE) {
        super(message, status_code);
        this.name = this.constructor.name;
        Error.captureStackTrace(this, this.constructor);
    }
}

/**
 * CampServiceError extends the ServiceError class and represents an error that has occured 
 * in an Camp Service operation. It stores a descriptive message and the status code 
 * corresponding to this error.
 * 
 * @extends ServiceError
 */
class CampServiceError extends ServiceError {
    
    /**
     * Create a Camo Service Error.
     * @param {string} [message] A descriptive message for the error.
     * @param {number} [status_code = DEFAULT_STATUS_CODE] The corresponding status code for this error.
     */
    constructor(message, status_code = DEFAULT_STATUS_CODE) {
        super(message, status_code);
        this.name = this.constructor.name;
        Error.captureStackTrace(this, this.constructor);
    }
}

/**
 * ScheduleServiceError extends the ServiceError class and represents an error that has occured 
 * in a Schedule Service operation. It stores a descriptive message and the status code 
 * corresponding to this error.
 * 
 * @extends ServiceError
 */
class ScheduleServiceError extends ServiceError {
    
    /**
     * Create a Schedule Service Error.
     * @param {string} [message] A descriptive message for the error.
     * @param {number} [status_code = DEFAULT_STATUS_CODE] The corresponding status code for this error.
     */
    constructor(message, status_code = DEFAULT_STATUS_CODE) {
        super(message, status_code);
        this.name = this.constructor.name;
        Error.captureStackTrace(this, this.constructor);
    }
}

module.exports = {
    AccountServiceError,
    CampServiceError,
    ScheduleServiceError
};