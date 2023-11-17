const campusService = require('../services/campusService');

/**
 * Retrieves a campus by ID.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @returns {Object} - An object containing a canmpus.
 */
async function getCampus(req, res) {
    const campus_id = req.body.campus_id;

    const campus = await campusService.getCampus(campus_id);

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
    const status = await campusService.createCampus(name);

    return {
        status: status ? 'Success' : 'failure'
    };
}

module.exports = {
    getCampus,
    getAllCampuses,
    createCampus
}