
const scheduleService = require('../services/scheduleService');

function generateSchedule(req, res) {
    const camp_id = req.body.camp_id;
    const start_time = new Date(req.body.start_time);
    const name = req.body.name;
    
    const new_schedule = scheduleService.generateSchedule(camp_id, start_time, name);

    return {
        schedule: new_schedule
    }
}

async function getAllSchedules(req, res) {
    const allschedules = await scheduleService.getAllSchedules();

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