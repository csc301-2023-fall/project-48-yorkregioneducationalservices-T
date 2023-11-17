/**
 * Schedule class represents a schedule for a group within a camp. It stores the
 * schedule ID, the corresponding group ID, the ordered blocks that constitute the
 * schedule, the start time and the end time.
 * 
 * @class Schedule
 */
class Schedule {
    /**
     * Create a Schedule entity.
     * @param {string} [schedule_id] UUID to identify unique schedule
     * @param {string} [group_id] UUID for the corresponding Group entity
     */
    constructor(schedule_id, group_id) {
        this.schedule_id = schedule_id;
        this.group_id = group_id;
        this.blocks = [];
    }
}

module.exports = Schedule;