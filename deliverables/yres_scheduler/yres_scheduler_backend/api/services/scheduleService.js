
const db = require('../db/psqlDbPlugin');
const Schedule = require('../entities/Schedule');
const crypto = require('crypto');

function generateSchedule(camp_id, start_time, name) {
    var activities = db.getCampActivities(camp_id);

    const schedule_id = crypto.randomUUID();

    var new_schedule = new Schedule(schedule_id,
                                    camp_id,
                                    start_time,
                                    name);

    // Construct random schedule
    while (activities.length > 0) {
        const rand = Math.floor(Math.random() * activities.length);
        var curr_activity = activities.splice(rand, 1)[0];
        new_schedule.addScheduleBlock(curr_activity);
    }

    if (db.submitSchedule(new_schedule) == false) throw Error("DB Submission failed");

    return new_schedule;

}

module.exports = {
    generateSchedule
}