
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

module.exports = {
    generateSchedule
}