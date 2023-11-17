const Activity = require("../entities/Activity");
/**
 * Class representing a schedule block unit.
 */
module.exports = class Block {
    /**
     * Create a new block object which will then be added to a schedule's set of blocks.
     * 
     * @param {string} block_id - The unique ID assigned by <CONTROLLER>. 
     * @param {string} schedule_id - The ID of the schedule this block is in.
     * @param {string} room_id - The ID of the room this block is held in.
     * @param {Activity} activity - The activity object this block is holding.
     * @param {number} day - The day index of this block.
     * @param {number} time - The time index of this block.
     */
    constructor(block_id, schedule_id, room_id, activity, day, time) {
        this.block_id = block_id;
        this.schedule_id = schedule_id;
        this.room_id = room_id;
        this.activity = activity;
        this.day = day;
        this.time = time;
    }
}
