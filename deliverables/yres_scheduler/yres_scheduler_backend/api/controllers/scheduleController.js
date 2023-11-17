
const scheduleService = require('../services/schedulingService');
const schedService = require('../services/scheduleService');
const studentService = require('../services/studentService');
const counselorService = require('../services/counselorService');
const roomService = require('../services/roomService');
const activitiesService = require('../controllers/activityController');

/**
 * Generates a new schedule.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @returns {Object} - An object containing the newly generated schedule.
 */
function generateSchedule(req, res) {


    const students = studentService.getAllStudents();
    const counselors = counselorService.getAllCounselorsByCampus();
    const rooms = roomService.getAllRooms();
    const activities = activitiesService.getAllActivities();

    const new_schedule = scheduleService.scheduleCall(generateSchedulestudents, counselors, rooms, activities);

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