/**
 * This module contains custom error classes to represent errors that occur in service 
 * module operations. This module also specifies the STATUS_CODES object to map status
 * labels to status codes.
 * 
 * @module api/entities/ServiceErrors
 */

/** @const {Object} [STATUS_CODES] Maps status labels to status codes. */
const STATUS_CODES = {
    SUCCESS:                    200,
    CREATED:                    201,
    INVALID:                    400,
    UNAUTHORISED:               401,
    FORBIDDEN:                  403,
    NOT_FOUND:                  404,
    CONFLICT:                   409,
    PAYLOAD_TOO_LARGE:          413,
    UNSUPPORTED_MEDIA_TYPE:     415,
    TEAPOT:                     418,
    FAILED:                     500,
    NOT_IMPLEMENTED:            501,
    INSUFFICIENT_STORAGE:       507
}

/** @const {number} [DEFAULT_STATUS_CODE] The default status code for errors. */
const DEFAULT_STATUS_CODE = STATUS_CODES.FAILED;

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
        this._status_code = status_code;
    }

    /**
     * Get the status code for this error.
     * @return {number} The status code for this error.
     */
    get status_code() {
        return this._status_code;
    }

    /**
     * Set the status code for this error.
     * @param {number} [new_status_code] The new status code for this error.
     */
    set status_code(new_status_code) {
        this._status_code = new_status_code;
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

/**
 * CampusServiceError extends the ServiceError class and represents an error that has occured 
 * in a Campus Service operation. It stores a descriptive message and the status code 
 * corresponding to this error.
 * 
 * @extends ServiceError
 */
class CampusServiceError extends ServiceError {
    
    /**
     * Create a Campus Service Error.
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
 * CounselorServiceError extends the ServiceError class and represents an error that has occured 
 * in a Counselor Service operation. It stores a descriptive message and the status code 
 * corresponding to this error.
 * 
 * @extends ServiceError
 */
class CounselorServiceError extends ServiceError {
    
    /**
     * Create a Counselor Service Error.
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
 * GroupServiceError extends the ServiceError class and represents an error that has occured 
 * in a Group Service operation. It stores a descriptive message and the status code 
 * corresponding to this error.
 * 
 * @extends ServiceError
 */
class GroupServiceError extends ServiceError {
    
    /**
     * Create a Group Service Error.
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
 * RoomServiceError extends the ServiceError class and represents an error that has occured 
 * in a Room Service operation. It stores a descriptive message and the status code 
 * corresponding to this error.
 * 
 * @extends ServiceError
 */
class RoomServiceError extends ServiceError {
    
    /**
     * Create a Room Service Error.
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
 * StudentServiceError extends the ServiceError class and represents an error that has occured 
 * in a Student Service operation. It stores a descriptive message and the status code 
 * corresponding to this error.
 * 
 * @extends ServiceError
 */
class StudentServiceError extends ServiceError {
    
    /**
     * Create a Room Service Error.
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
 * BlockServiceError extends the ServiceError class and represents an error that has occured 
 * in a Block Service operation. It stores a descriptive message and the status code 
 * corresponding to this error.
 * 
 * @extends ServiceError
 */
class BlockServiceError extends ServiceError {
    
    /**
     * Create a Block Service Error.
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
 * ActivityServiceError extends the ServiceError class and represents an error that has occured 
 * in a Activity Service operation. It stores a descriptive message and the status code 
 * corresponding to this error.
 * 
 * @extends ServiceError
 */
class ActivityServiceError extends ServiceError {
    
    /**
     * Create a Block Service Error.
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
    ActivityServiceError,
    BlockServiceError,
    CampServiceError,
    ScheduleServiceError,
    CampusServiceError,
    CounselorServiceError,
    GroupServiceError,
    RoomServiceError,
    StudentServiceError,
    STATUS_CODES
};