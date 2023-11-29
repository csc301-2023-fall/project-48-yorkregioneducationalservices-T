/**
 * This module represents the Schedule entity.
 * 
 * @module api/entities/Schedule
 */

/** @const {module} Block The Block entity */
const Block = require("./Block");

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
     * @param {number} [schedule_id] UUID to identify unique schedule
     * @param {number} [group_id] UUID for the corresponding Group entity
     * @param {list[Block]} [blocks] The ordered block entities that constitute the schedule
     * @param {Date} [start_time] The start time of the schedule
     * @param {Date} [end_time] The end time of the schedule
     */
    constructor(schedule_id,
                group_id,
                blocks,
                start_time,
                end_time) {

        this.schedule_id = schedule_id;
        this.group_id = group_id;
        this.blocks = blocks;
        this.start_time = start_time;
        this.end_time = end_time;
    }

    /**
     * Add an activity as the next block in this schedule.
     *
     * @param {Activity} [activity] The activity to be added next in the schedule.
     */
    addBlock(activity) {
        var new_start_time;
        var new_end_time;
        var last_block;

        if (this.blocks.length == 0) {
            new_start_time = this.start_time;
        } else {
            last_block = this.blocks[this.blocks.length - 1]
            new_start_time = last_block.end_time;
        }
        new_end_time = new Date();
        new_end_time.setTime(new_start_time.getTime() + (activity.duration * 60 * 60 * 1000));
        if (new_end_time <= this.end_time) {
            this.blocks.push(new Block(activity, new_start_time, new_end_time));
        }
    }

    /**
     * Add pre-existing block to list for this schedule
     * @param {Block} block - The new block for this schedule
     */
    add_given_block(block) {
        this.blocks.push(block);
        return;
    }

    /**
     * Set the blocks list for this schedule
     * @param {list[Block]} blocks - The new list of blocks for this schedule
     */
    set_blocks(blocks) {
        this.blocks = blocks;
        return;
    }

    /**
     * Set the schedule id for this schedule
     * @param {number} schedule_id - The new schedule id for this schedule
     */
    set_schedule_id(schedule_id) {
        this.schedule_id = schedule_id;
        return;
    }

    /**
     * Set the group ID for this schedule
     * @param {number} group_id - The new group Id for this schedule
     */
    set_group_id(group_id) {
        this.group_id = group_id;
        return;
    }

    /**
     * Set the start time for this schedule
     * @param {Date} start_time - The new start time for this schedule
     */
    set_start_time(start_time) {
        this.start_time = start_time;
        return;
    }
    /**
     * Set the end time for this schedule
     * @param {Date} end_time - The new end time for this schedule
     */
    set_end_time(end_time) {
        this.end_time = end_time;
        return;
    }
    
    /**
     * @returns start_time as a string.
     */
    getStartTime() {    
        var start_hours = this.start_time.getHours();
        var start_minutes = this.start_time.getMinutes();
        var start;
        if (start_minutes < 10) {
            start = start_hours + ":0" + start_minutes;
        } else {
            start = start_hours + ":" + start_minutes;
        }

        return start;
    }

    /**
     * @returns end_time as a string.
     */
    getEndTime() {    
        var end_hours = this.end_time.getHours();
        var end_minutes = this.end_time.getMinutes();
        var end;
        if (end_minutes < 10) {
            end = end_hours + ":0" + end_minutes;
        } else {
            end = end_hours + ":" + end_minutes;
        }
        
        return end;
    }

}

module.exports = Schedule;