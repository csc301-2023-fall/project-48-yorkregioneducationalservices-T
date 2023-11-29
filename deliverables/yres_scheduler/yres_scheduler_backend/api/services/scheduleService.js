
const db = require('../db/psqlDbPlugin');
const schedb = require('../db/scheduleDbPlugin');
const scheduleAlgo = require('../services/scheduleAlgo');
const { saveJsonToFile, getJsonFromFile } = require('../utils/saveJsonToFile.js');
const FILE_PATH = 'deliverables/yres_scheduler/yres_scheduler_backend/api/schedules/schedule.json';

async function generateSchedule(students, counselors, activities, rooms) {

    const new_schedule = await scheduleAlgo.scheduleCall(students, counselors, activities, rooms);
        
    // Save the schedule to a file
    saveJsonToFile(new_schedule, FILE_PATH);

    return new_schedule;
}

/**
 * Retrieves the current schedule.
 * @returns {Promise<Object>} The current schedule.
 */
async function getCurrentSchedule() {
   
    const current_schedule = await getJsonFromFile(FILE_PATH);

    return current_schedule;
}

/**
 * Retrieves all schedules (should be only one) from the database.
 *
 * @returns {Promise<Array>} - A promise that resolves to an array of schedule objects.
 */
async function getAllSchedules() {
    var all_schedules = await schedb.getAllSchedules();
    return all_schedules;
}

module.exports = {
    generateSchedule,
    getAllSchedules,
    getCurrentSchedule
}