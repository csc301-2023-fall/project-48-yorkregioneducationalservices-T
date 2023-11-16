
const campService = require('../services/campService');

/**
 * Retrieves a camp by ID.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @returns {Object} - An object containing a camp.
 */
async function getCamp(req, res) {
    const camp_id = req.body.camp_id;

    const camp = await campService.getCamp(camp_id);

    return {
        camp: camp
    };
}

/**
 * Retrieves all camps in a campus.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @returns {Object} - An object containing an array of camps with activity ids.
 */
async function getAllCamps(req, res) {
    const campus_id = req.body.campus_id;
    const allcamps = await campService.getAllCamps(campus_id);

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
    const status = await campService.createCamp(name, campus_id);

    return {
        status: status ? 'Success' : 'failure'
    };
}

module.exports = {
    getCamp,
    getAllCamps,
    createCamp
}