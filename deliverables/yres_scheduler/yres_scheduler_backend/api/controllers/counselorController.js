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
    const result = await counselorService.getAllCounselors();
    res.status(STATUS_CODES.SUCCESS);
    return result;

}

/**
 * Creates a new counselor.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @returns {Object} - An object containing the status of the operation.
 */
async function createCounselor(req, res) {
    
    const counselor = req.body;

    const result = await counselorService.createCounselor(counselor);

    return result;
}

/**
 * Edits an existing counselor by ID.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @returns {Object} - An object containing the status of the operation.
 */
async function editCounselorById(req, res) {

    const counselor = req.body;

    const result = await counselorService.editCounselorById(counselor);

    return result;
}

/**
 * Deletes an existing counselor by ID.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @returns {Object} - An object containing the status of the operation.
 */
async function deleteCounselorById(req, res) {
    
    const counselor_ui_id = req.params.counselor_id;

    const result = await counselorService.deleteCounselorById(counselor_ui_id);

    return result; 
}

module.exports = {
    getAllCounselors,
    createCounselor,
    editCounselorById,
    deleteCounselorById
}