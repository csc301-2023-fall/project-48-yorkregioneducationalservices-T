/**
 * This module represents the Block entity.
 * 
 * @module api/entities/Block
 */

/**
 * The Block class represents a "block of time" in a schedule that corresponds to an
 * activity. It stores the block ID, the corresponding room ID, the corresponding 
 * activity ID, the start time and the end time.
 * 
 * @class Block
 */
class Block {

    /**
     * Create a Block entity.
     * @param {uuid} [block_id] UUID to identify unique Block entity
     * @param {uuid} [room_id] UUID for corresponding room entity
     * @param {uuid} [activity_id] UUID for corresponding activity entity
     * @param {Date} [start_time] The start time of the schedule block
     * @param {Date} [end_time] The end time of the schedule block
     */
    constructor(block_id, room_id, activity_id, start_time, end_time) {
        this.block_id = block_id;
        this.room_id = room_id;
        this.activity_id = activity_id;
        this.start_time = start_time;
        this.end_time = end_time;
    }

    /**
     * Get the block ID for this block
     * @return {uuid} The block ID for this block
     */
    get block_id() {
        return this.block_id;
    }

    /**
     * Get the room ID for this block
     * @return {uuid} The corresponding room ID for this block
     */
    get room_id() {
        return this.room_id;
    }

    /**
     * Get the activity ID for this block
     * @return {uuid} The corresponding activity ID for this block
     */
    get activity_id() {
        return this.activity_id;
    }

    /**
     * Get the start time for this block
     * @return {Date} The start time for this block
     */
    get start_time() {
        return this.start_time;
    }

    /**
     * Get the stendart time for this block
     * @return {Date} The end time for this block
     */
    get end_time() {
        return this.end_time;
    }

}

module.exports = Block;