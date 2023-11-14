/**
 * Class representing a schedule profile.
 */

module.exports = class Schedule {

    /**
     * Create a new schedule profile.
     * 
     * @param {string} schedule_id - The unique ID of this student.
     * @param {number} group_id - The ID of the group this schedule belongs to
     * @param {Set<Block>} blocks 
     * @param {Date} start_time 
     * @param {Date} end_time 
    */

    schedule_id;
    camp_id;
    start_time;
    name;
    schedule_blocks;

    constructor(schedule_id,
                camp_id,
                start_time,
                name) {
        this.schedule_id = schedule_id;
        this.camp_id = camp_id;
        this.start_time = start_time;
        this.name = name;
        this.schedule_blocks = [];
    }

    addScheduleBlock(activity) {
        var new_start_time;
        var new_end_time;
        var last_block;

        if (this.schedule_blocks.length == 0) {
            new_start_time = this.start_time;
        } else {
            last_block = this.schedule_blocks[this.schedule_blocks.length - 1]
            new_start_time = last_block.end_time;
        }
        new_end_time = new Date();
        new_end_time.setTime(new_start_time.getTime() + (activity.time_length * 60 * 60 * 1000));

        this.schedule_blocks.push(new ScheduleBlock(activity, new_start_time, new_end_time));
    }

    getScheduleBlocks() {
        return this.schedule_blocks;
    }

}*/