
const scheduleAlgo = require('../services/scheduleAlgo');
const schedService = require('../services/scheduleService');
const studentService = require('../services/studentService');
const counselorService = require('../services/counselorService');
const roomService = require('../controllers/roomController');
const activitiesService = require('../controllers/activityController');
const saveJsonToFile = require('../utils/saveJsonToFile.js');
const FILE_PATH = 'deliverables/yres_scheduler/yres_scheduler_backend/api/schedules/schedule.json';

/**
 * Generates a new schedule.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @returns {Object} - An object containing the newly generated schedule.
 */
async function generateSchedule(req, res) {
    
    const students = await studentService.getAllStudents();
    const counselors = await counselorService.getAllCounselors();
    const rooms = await roomService.getAllRooms();
    const activities = await activitiesService.getAllActivities();

    const new_schedule = await scheduleAlgo.scheduleCall(students, counselors, activities, rooms);
    
    // Save the schedule to a file
    saveJsonToFile(new_schedule, FILE_PATH);

    return {
        schedule: new_schedule
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
    getAllSchedules
}