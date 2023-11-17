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
     * @param {string} activity_id - The ID of the activity this block is hosting.
     * @param {Date} start_time - The starting moment of this block.
     * @param {Date} end_time - The ending moment of this block.
     */
    constructor(block_id, schedule_id, room_id, activity_id, start_time, end_time) {
        this.block_id = block_id;
        this.schedule_id = schedule_id;
        this.room_id = room_id;
        this.activity_id = activity_id;
        this.start_time = start_time;
        this.end_time = end_time;
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
