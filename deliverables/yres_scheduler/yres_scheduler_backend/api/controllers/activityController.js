/**
 * This module implements the controller for requests for activity service 
 * operations.
 * 
 * @module api/controllers/activityController
 * 
 * @requires api/services/activityService
 * @requires api/entities/ServiceErrors
 */

const activityService = require('../services/activityService');
const {ActivityServiceError, STATUS_CODES} = require('../entities/ServiceErrors');

/**
 * Get all activities in the database.
 * @async
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @returns {Object} - JSON representation of all activities.
 */
async function getAllActivities(req, res) {
    const all_activities = await activityService.getAllActivities();
    res?.status(STATUS_CODES.SUCCESS);
    return {
        activities: all_activities
    };
}

/**
 * Create an activity data row in the database with given information.
 * @async
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @returns {Object} - If the insertion succeeded.
 */
async function createActivity(req, res) {
    const name = req.body.name;
    const duration = parseInt(req.body.duration);
    const type = req.body.type;
    const num_occurences = parseInt(req.body.num_occurences);
    const room_ids = req.body.room_ids;
    const camp_id = req.body.camp_id;

    if (!name || !duration || !type || !num_occurences || !camp_id) {
        throw new ActivityServiceError(
            `Invalid paramaters provided for request`,
            STATUS_CODES.INVALID
        );
    }

    const succeed = await activityService.createActivity(name, duration, type, num_occurences, camp_id, room_ids);

    res.status(STATUS_CODES.CREATED);

    return {
        status: succeed ? 'Success' : 'failure'
    };
}

/**
 * Edit an activity data row in the database with given activity object.
 * @async
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @returns {Object} - If the update succeeded.
 */
async function editActivityById(req, res) {

    const activity_id = req.params.activity_id;
    const name = req.body.name;
    const duration = parseInt(req.body.duration);
    const type = req.body.type;
    const num_occurences = parseInt(req.body.num_occurences);
    const room_ids = req.body.room_ids;
    const camp_id = req.body.camp_id;

    if (!activity_id || !name || !duration || !type || !num_occurences || !camp_id) {
        throw new ActivityServiceError(
            `Invalid paramaters provided for request`,
            STATUS_CODES.INVALID
        );
    }

    const status = await activityService.editActivityById(
        activity_id,
        name,
        duration,
        type, 
        num_occurences, 
        camp_id, 
        room_ids
    );

    res.status(STATUS_CODES.SUCCESS);

    return {
        status: status ? 'Success' : 'failure'
    }
}

/**
 * Delete an activity data row in the database with given activity_id.
 * @async
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @returns {Object} - If the deletion succeeded.
 */
async function deleteActivityById(req, res) {
    const activity_id = req.params.activity_id;
    
    if (!activity_id ) {
        throw new ActivityServiceError(
            `Invalid paramaters provided for request`,
            STATUS_CODES.INVALID
        );
    }

    const status = await activityService.deleteActivityById(activity_id);

    res.status(STATUS_CODES.SUCCESS);

    return {
        status: status ? 'Success' : 'failure'
    }
}

module.exports = {
    getAllActivities,
    createActivity,
    editActivityById,
    deleteActivityById
}