/**
 * @fileoverview This file contains the controller functions for managing activities in the database.
 * @module activityController
 */

const db = require('../db/activityDbPlugin');
const uuid = require('uuid');

/**
 * Get all activities in the database.
 * @async
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @returns {Object} - JSON representation of all activities.
 */
async function getAllActivities(req, res) {
    const all_activities = await db.getAllActivities();
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
        console.log('createActivity - Bad form: missing parameter');
        throw Error('createActivity - Bad form: missing parameter');
    }
    var succeed = await db.createActivity(uuid.v1(), name, duration, type, num_occurences, camp_id, room_ids);
    console.log(succeed);
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

    const activity = req.body;

    const status = await db.editActivityById(activity);

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
    const activity_id = req.body.activity_id;
    if (!uuid.validate(activity_id)) {
        console.log('deleteActivity - Bad form: unexpected uuid');
        throw Error('deleteActivity - Bad form: unexpected uuid');
    }
    const status = await db.deleteActivityById(activity_id);

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