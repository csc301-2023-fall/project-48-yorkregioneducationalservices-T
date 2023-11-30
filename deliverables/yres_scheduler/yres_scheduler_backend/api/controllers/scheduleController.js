const schedService = require('../services/scheduleService');
const studentService = require('../services/studentService');
const counselorService = require('../services/counselorService');
const roomService = require('../controllers/roomController');
const activitiesService = require('../controllers/activityController');

/**
 * Generates a new schedule.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @returns {Object} - An object containing the newly generated schedule.
 */
async function generateSchedule(req, res) {
    
    console.log("Getting students...");
    const students = await studentService.getAllStudents();
    console.log("Getting counselors...");
    const counselors = await counselorService.getAllCounselors();
    console.log("Getting rooms...");
    const rooms = await roomService.getAllRooms();

    console.log("Getting activities...");
    const activities = await activitiesService.getAllActivities();
    console.log("Generating schedule...");
    const new_schedule = await schedService.generateSchedule(students, counselors, activities.activities, rooms.rooms);

    res.status(STATUS_CODES.SUCCESS);

    return {
        schedule: new_schedule
    }
}

async function getCurrentSchedule(req, res) {
    const current_schedule = await schedService.getCurrentSchedule();

    res.status(STATUS_CODES.SUCCESS);
    
    return {
        schedule: current_schedule
    }
}

/**
 * Retrieves all schedules.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @returns {Object} - An object containing an array of schedules with a collection of blocks and start/end time strings.
 */
async function getAllSchedules(req, res) {
    const allschedules = await schedService.getAllSchedules();

    res.status(STATUS_CODES.SUCCESS);

    return {
        schedules: allschedules.map((schedule) => { 
            return {
                ...schedule,
                blocks: schedule.blocks.map((block) => {
                    return {
                        ...block,
                        start_time: block.getStartTime(),
                        end_time: block.getEndTime()
                    }
                }),
                start_time: schedule.getStartTime(),
                end_time: schedule.getEndTime()
            };
        })
    };
}

module.exports = {
    generateSchedule,
    getAllSchedules,
    getCurrentSchedule
}