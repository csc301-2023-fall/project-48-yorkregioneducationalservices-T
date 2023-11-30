/**
 * This module implements the controller for requests for counselor service 
 * operations.
 * 
 * @module api/controllers/counselorController
 * 
 * @requires api/services/counselorService
 * @requires api/entities/ServiceErrors
 */

const counselorService = require('../services/counselorService');
const {CounselorServiceError, STATUS_CODES} = require('../entities/ServiceErrors');


/**
 * Retrieves all counselors by campus ID.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @returns {Object} - An object containing an array of counselors.
 */
async function getAllCounselors(req, res) {
    const counselors = await counselorService.getAllCounselors();
    res.status(STATUS_CODES.SUCCESS);
    return {
        counselors: counselors
    };

}

/**
 * Creates a new counselor.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @returns {Object} - An object containing the status of the operation.
 */
async function createCounselor(req, res) {
    
    const firstname = req.body.firstname;
    const lastname = req.body.lastname;

    // Check paramaters are valid
    if (!firstname || !lastname) {
        throw new CounselorServiceError(
            `Invalid paramaters provided for request`,
            STATUS_CODES.INVALID
        );
    }

    const status = await counselorService.createCounselor(firstname, lastname);

    res.status(STATUS_CODES.CREATED);

    return {
        status: status
    };
}

/**
 * Edits an existing counselor by ID.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @returns {Object} - An object containing the status of the operation.
 */
async function editCounselorById(req, res) {
    const counselor_id = req.params.counselor_id;
    const firstname = req.body.firstname;
    const lastname = req.body.lastname;

    // Check paramaters are valid
    if (!counselor_id || !firstname || !lastname) {
        throw new CounselorServiceError(
            `Invalid paramaters provided for request`,
            STATUS_CODES.INVALID
        );
    }

    const status = await counselorService.editCounselorById(counselor_id, firstname, lastname);

    res.status(STATUS_CODES.SUCCESS);

    return {
        status: status
    };
}

/**
 * Deletes an existing counselor by ID.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @returns {Object} - An object containing the status of the operation.
 */
async function deleteCounselorById(req, res) {
    
    const counselor_ui_id = req.params.counselor_id;

    // Check paramaters are valid
    if (!counselor_ui_id) {
        throw new CounselorServiceError(
            `Invalid paramaters provided for request`,
            STATUS_CODES.INVALID
        );
    }

    const status = await counselorService.deleteCounselorById(counselor_ui_id);

    res.status(STATUS_CODES.SUCCESS);

    return {
        status: status
    }; 
}

module.exports = {
    getAllCounselors,
    createCounselor,
    editCounselorById,
    deleteCounselorById
}