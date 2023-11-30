/**
 * This module implements the use case operations for the schedule service.
 * 
 * @module api/service/scheduleService
 * 
 * @requires api/db/scheduleDbPlugin
 * @requires api/entities/ServiceErrors
 */

const schedb = require('../db/scheduleDbPlugin');
const scheduleAlgo = require('../services/scheduleAlgo');
const { saveJsonToFile, getJsonFromFile } = require('../utils/saveJsonToFile.js');
const FILE_PATH = './saved_scheduled.json';
const {ScheduleServiceError, STATUS_CODES} = require('../entities/ServiceErrors');


async function generateSchedule(students, counselors, activities, rooms) {  
    try {
        const new_schedule = await scheduleAlgo.scheduleCall(students, counselors, activities, rooms);
        // Save the schedule to a file
        saveJsonToFile(new_schedule, FILE_PATH);

        return new_schedule;
    } catch(err) {
        throw new ScheduleServiceError(
            `Failed to generate schedule`,
            STATUS_CODES.FAILED
        );
    }
}

/**
 * Retrieves the current schedule.
 * @returns {Promise<Object>} The current schedule.
 */
async function getCurrentSchedule() {
   
    try {
        const current_schedule = await getJsonFromFile(FILE_PATH);
        return current_schedule;

    } catch(err) {
        throw new ScheduleServiceError(
            `Failed to retrieve current schedule from file`,
            STATUS_CODES.FAILED
        );
    }
}

/**
 * Retrieves all schedules (should be only one) from the database.
 *
 * @returns {Promise<Array>} - A promise that resolves to an array of schedule objects.
 */
async function getAllSchedules() {
    try {
        var all_schedules = await schedb.getAllSchedules();
        return all_schedules;
    } catch(err) {
        throw new ScheduleServiceError(
            `DB Operation Failure: ${err}`,
            STATUS_CODES.FAILED
        );
    }
}

module.exports = {
    generateSchedule,
    getAllSchedules,
    getCurrentSchedule
}