const counselorService = require('../services/counselorService');

/**
 * Retrieves all counselors by campus ID.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @returns {Object} - An object containing an array of counselors.
 */
function getAllCounselorsByCampus(req, res) {

    const campus_id = req.body.camp_id;

    const all_counselors_by_campus = counselorService.getAllCounselorsByCampus(campus_id);

    return {
        counselors: all_counselors_by_campus
    };
}

/**
 * Creates a new counselor.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @returns {Object} - An object containing the status of the operation.
 */
async function createCounselor(req, res) {
    
    const counselor = req.body;

    const status = await counselorService.createCounselor(counselor);

    return {
        status: status ? 'Success' : 'failure'
    }
}

/**
 * Edits an existing counselor by ID.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @returns {Object} - An object containing the status of the operation.
 */
async function editCounselorById(req, res) {

    const counselor = req.body;

    const status = await counselorService.editCounselorById(counselor);

    return {
        status: status ? 'Success' : 'failure'
    }
}

/**
 * Deletes an existing counselor by ID.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @returns {Object} - An object containing the status of the operation.
 */
async function deleteCounselorById(req, res) {
    
    const counselor_ui_id = req.body.counselor_ui_id;

    const status = await counselorService.deleteCounselorById(counselor_ui_id);

    return {
        status: status ? 'Success' : 'failure'
    }
}

module.exports = {
    getAllCounselorsByCampus,
    createCounselor,
    editCounselorById,
    deleteCounselorById
}