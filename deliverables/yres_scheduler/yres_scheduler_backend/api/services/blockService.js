const db = require('../db/blockDbPlugin');

/**
 * Retrieves a block object by their ID.
 * @param {number} block_id - The ID of the block to retrieve.
 * @returns {object} - The block object.
 */
async function getBlock(block_id) {
    var block = await db.getBlockById(block_id);

    return block;

}

/**
 * Retrieves all blocks from the database.
 *
 * @returns {Promise<Array>} - A promise that resolves to an array of block objects.
 */
async function getAllBlocks() {
    var all_blocks = await db.getAllBlocks();
    return all_blocks;
}

/**
 * Creates a new block record in the database.
 * @async
 * @function createBlock
 * @param {number} schedule_id - The unique identifier of the schedule this block is in (can be excluded).
 * @param {number} room_id - The unique identifier of the room this block is held in.
 * @param {number} activity_id - The unique identifier of the activity this block is hosting.
 * @param {string} start_time - The start time of the block as a string (e.g.: '8:00', '12:00').
 * @param {string} end_time - The end time of the block as a string (e.g.: '8:00', '12:00').
 * @returns {Promise<boolean>} - A promise that resolves to true if the block was created successfully.
 */
function createBlock(schedule_id, room_id, activity_id, start_time, end_time) {
    var block = db.createBlock(schedule_id, room_id, activity_id, start_time, end_time);
    return block;
}

/**
 * Deletes all blocks in the database.
 *
 * @returns {Promise<boolean>} - A promise that resolves to true if the deletion succeeded.
 */
function deleteAllBlocks() {
    var block = db.deleteAllBlocks();
    return block;
}

module.exports = {
    getBlock,
    getAllBlocks,
    createBlock,
    deleteAllBlocks
}