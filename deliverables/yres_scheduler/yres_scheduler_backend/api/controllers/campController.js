/**
 * This module implements the controller for requests for camp service 
 * operations.
 * 
 * @module api/controllers/campController
 * 
 * @requires api/services/campService
 * @requires api/entities/ServiceErrors
 * 
 */
const campService = require('../services/campService');
const {CampServiceError, STATUS_CODES} = require('../entities/ServiceErrors');

/**
 * Retrieves a camp by ID.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @returns {Object} - An object containing a camp.
 */
async function getCamp(req, res) {
    const camp_id = req.params.camp_id;

    // Check paramaters are valid
    if (!camp_id) {
        throw new CampServiceError(
            `Invalid paramaters provided for request`,
            STATUS_CODES.INVALID
        );
    }

    const camp = await campService.getCamp(camp_id);

    res.status(STATUS_CODES.SUCCESS);

    return {
        camp: camp
    };
}

/**
 * Retrieves all camps.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @returns {Object} - An object containing an array of camps with activity ids.
 */
async function getAllCamps(req, res) {
    const allcamps = await campService.getAllCamps();

    res.status(STATUS_CODES.SUCCESS);

    return {
        camps: allcamps.map((camp) => { 
            return {
                ...camp,
                activity_ids: camp.getActivityIds()
            };
        })
    };
}

/**
 * Creates a new camp.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @returns {Object} - An object containing a status message.
 */
async function createCamp(req, res) {
    const name = req.body.name;
    const campus_id = req.body.campus_id;

    // Check paramaters are valid
    if (!name || !campus_id) {
        throw new CampServiceError(
            `Invalid paramaters provided for request`,
            STATUS_CODES.INVALID
        );
    }

    const status = await campService.createCamp(name, campus_id);

    res.status(STATUS_CODES.SUCCESS);

    return {
        status: status ? 'Success' : 'failure'
    };
}

/**
 * Set a new floorplan for a camp.
 * 
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @returns {Object} - An object containing a status message.
 */
async function setFloorplan(req, res) {

    const status = await campService.setFloorplan();

    res.status(STATUS_CODES.SUCCESS);

    return {
        status: status ? 'Success' : 'failure',
        path: req.file.path
    };
}

module.exports = {
    getCamp,
    getAllCamps,
    createCamp,
    setFloorplan
}