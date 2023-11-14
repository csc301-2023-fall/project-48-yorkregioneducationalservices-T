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
     * @param {uuid} [schedule_id] UUID to identify unique schedule
     * @param {uuid} [group_id] UUID for the corresponding Group entity
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

        if (this.schedule_blocks.length == 0) {
            new_start_time = this.start_time;
        } else {
            last_block = this.schedule_blocks[this.schedule_blocks.length - 1]
            new_start_time = last_block.end_time;
        }
        new_end_time = new Date();
        new_end_time.setTime(new_start_time.getTime() + (activity.duration * 60 * 60 * 1000));
        if (new_end_time <= this.end_time) {
            this.schedule_blocks.push(new Block(activity, new_start_time, new_end_time));
        }
    }

    /**
     * Get the ordered blocks for this schedule
     * @return {list[Block]} The ordered blocks for this schedule
     */
    get blocks() {
        return this.blocks;
    }

    /**
     * Get the schedule ID for this schedule
     * @return {uuid} The schedule ID for this schedule
     */
    get schedule_id() {
        return this.schedule_id;
    }

    /**
     * Get the group ID for this schedule
     * @return {uuid} The group ID for this schedule
     */
    get group_id() {
        return this.group_id;
    }

    /**
     * Get the start time for this schedule
     * @return {Date} The start time for this schedule
     */
    get start_time() {
        return this.start_time;
    }

    /**
     * Get the end time for this schedule
     * @return {Date} The end time for this schedule
     */
    get end_time() {
        return this.end_time;
    }

}

module.exports = Schedule;