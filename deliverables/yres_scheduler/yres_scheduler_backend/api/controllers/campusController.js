/**
 * This module implements the controller for requests for campus service 
 * operations.
 * 
 * @module api/controllers/campusController
 * 
 * @requires api/services/campusService
 * @requires api/entities/ServiceErrors
 */

const campusService = require('../services/campusService');
const {CampusServiceError, STATUS_CODES} = require('../entities/ServiceErrors');

/**
 * Retrieves a campus by ID.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @returns {Object} - An object containing a canmpus.
 */
async function getCampus(req, res) {
    const campus_id = req.params.campus_id;

    // Check paramaters are valid
    if (!campus_id) {
        throw new CampusServiceError(
            `Invalid paramaters provided for request`,
            STATUS_CODES.INVALID
        );
    }

    const campus = await campusService.getCampus(campus_id);

    res.status(STATUS_CODES.SUCCESS);

    return {
        campus: campus
    };
}

/**
 * Retrieves all campuses.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @returns {Object} - An object containing an array of campuses with camp and room ids.
 */
async function getAllCampuses(req, res) {
    const allcampuses = await campusService.getAllCampuses();

    res.status(STATUS_CODES.SUCCESS);

    return {
        campuses: allcampuses.map((campus) => { 
            return {
                ...campus,
                camp_ids: campus.getCampIds(),
                room_ids: campus.getRoomIds()
            };
        })
    };
}

/**
 * Creates a new campus.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @returns {Object} - An object containing a status message.
 */
async function createCampus(req, res) {
    const name = req.body.name;

    // Check paramaters are valid
    if (!name) {
        throw new CampusServiceError(
            `Invalid paramaters provided for request`,
            STATUS_CODES.INVALID
        );
    }

    const status = await campusService.createCampus(name);

    res.status(STATUS_CODES.SUCCESS);

    return {
        status: status ? 'Success' : 'failure'
    };
}

module.exports = {
    getCampus,
    getAllCampuses,
    createCampus
}