/**
 * This module implements the use case operations for the activity service.
 * 
 * @module api/service/activityService
 * 
 * @requires api/db/activityDbPlugin
 * @requires api/entities/ServiceErrors
 */

const db = require('../db/activityDbPlugin');
const {ActivityServiceError, STATUS_CODES} = require('../entities/ServiceErrors');
const uuid = require('uuid');

/**
 * Retrieves all activity entities from the database.
 *
 * @returns {Array<Activity>} - An array of Activity entities.
 */
async function getAllActivities() {
    try {
        return await db.getAllActivities();
    } catch(err) {
        throw new ActivityServiceError(
            `DB Operation Failure: ${err}`,
            STATUS_CODES.FAILED
        );
    }
}

/**
 * Creates an activity entity resource in the database.
 * 
 * @param name The name of the activity
 * @param duration The duration of the activity (in hours)
 * @param type The type of the activity (COMMON_TYPE or FILLER_TYPE)
 * @param num_occurences The number of occurences of the activity
 * @param camp_id The ID of the associated camp
 * @param room_ids The room IDs for the camp
 *
 * @returns {boolean} - Whether operation succeeded
 */
async function createActivity(
    name,
    duration,
    type, 
    num_occurences, 
    camp_id, 
    room_ids) {

    try {
        return await db.createActivity(name, duration, type, num_occurences, camp_id, room_ids);
    } catch(err) {
        throw new ActivityServiceError(
            `DB Operation Failure: ${err}`,
            STATUS_CODES.FAILED
        );
    }
}

/**
 * Edit an activity data row in the database with given activity object.
 * 
 * @param activity_id The ID for the activity
 * @param name The name of the activity
 * @param duration The duration of the activity (in hours)
 * @param type The type of the activity (COMMON_TYPE or FILLER_TYPE)
 * @param num_occurences The number of occurences of the activity
 * @param camp_id The ID of the associated camp
 * @param room_ids The room IDs for the camp
 *
 * @returns {boolean} - Whether operation succeeded
 */
async function editActivityById(
    activity_id,
    name,
    duration,
    type, 
    num_occurences, 
    camp_id, 
    room_ids) {

    try {
        return await db.editActivityById(activity_id, name, duration, type, num_occurences, camp_id, room_ids);
    } catch(err) {
        throw new ActivityServiceError(
            `DB Operation Failure: ${err}`,
            STATUS_CODES.FAILED
        );
    }
}

/**
 * Delete an activity entity in the database with given activity ID.
 * 
 * @param activity_id The ID for the activity
 * 
 * @returns {boolean} - Whether operation succeeded
 */
async function deleteActivityById(activity_id) {
    try {
        return await db.deleteActivityById(activity_id);
    } catch(err) {
        throw new ActivityServiceError(
            `DB Operation Failure: ${err}`,
            STATUS_CODES.FAILED
        );
    }
}

module.exports = {
    getAllActivities,
    createActivity,
    editActivityById,
    deleteActivityById
}