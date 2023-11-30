/**
 * This module implements the DB operations for the block service.
 * 
 * @module api/db/blockDbPlugin
 * 
 * @requires api/entities/Block
 * @requires api/db/db
 */

const Block = require("../entities/Block");
const { client } = require('./db');

/**
 * Maps a row from the Block table to a Block object.
 * @param {Object} row - The row from the Block table.
 * @returns {Block} A new Block object.
 */
function mapRowToBlock(row) {
    var start_hours = row.start_time.slice(0, 2);
    var start_minutes = row.start_time.slice(3, 5);
    var start_time = new Date(2023, 1, 1, parseInt(start_hours), parseInt(start_minutes));

    var end_hours = row.end_time.slice(0, 2);
    var end_minutes = row.end_time.slice(3, 5);
    var end_time = new Date(2023, 1, 1, parseInt(end_hours), parseInt(end_minutes));
    
    return new Block(
        row.block_id.toString(),
        row.schedule_id.toString(),
        row.room_id.toString(),
        row.activity_id.toString(),
        start_time,
        end_time
    );
}

/**
 * Retrieves a block from the database by their ID.
 *
 * @param {string} block_id - The ID of the block to retrieve.
 * @returns {Block} A corresponding block entity or null if none is found for the block_id.
 * @throws {Error} If there was an error retrieving the block from the database.
 */
async function getBlockById(block_id) {

    var schedule_id;
    var room_id;
    var activity_id;
    var start_time;
    var end_time;

    const query = `Select * from Block where block_id = '${block_id}';`;
    try {
        const result = await client.query(query);

        if (result && result.rowCount > 0) {
            schedule_id = result.rows[0].schedule_id;
            room_id = result.rows[0].room_id;
            activity_id = result.rows[0].activity_id;

            // Set date to be January 1, 2023 (arbitrary, only need to keep track of hours and minutes.)
            start_hours = result.rows[0].start_time.slice(0, 2);
            start_minutes = result.rows[0].start_time.slice(3, 5);
            start_time = new Date(2023, 1, 1, parseInt(start_hours), parseInt(start_minutes));

            end_hours = result.rows[0].end_time.slice(0, 2);
            end_minutes = result.rows[0].end_time.slice(3, 5);
            end_time = new Date(2023, 1, 1, parseInt(end_hours), parseInt(end_minutes));

            return new Block(
                block_id,
                schedule_id,
                room_id,
                activity_id,
                start_time,
                end_time);

        } else {
            return null;
        }

    } catch (err){
        throw new Error(err);
    }
}

/**
 * Retrieves all Blocks from the database and maps them to Block objects.
 * 
 * @returns {Array<Block>} An array of Block entities.
 */
async function getAllBlocks() {

    var all_blocks;
    const query = `SELECT * FROM Block;`;
    try {
        const result = await client.query(query);

        if (result && result.rowCount > 0) {
            const rows = result.rows;
            all_blocks = rows.map(mapRowToBlock);
            return all_blocks;
        } else {
            return [];
        }

    } catch (err){
        throw new Error(err);
    }
}

/**
 * Creates a new block record in the database.
 * @async
 * @function createBlock
 * @param {number} schedule_id - The unique identifier of the schedule this block is in (can be null).
 * @param {number} room_id - The unique identifier of the room this block is held in.
 * @param {number} activity_id - The unique identifier of the activity this block is hosting.
 * @param {string} start_time - The start time of the block as a string (e.g.: '8:00', '12:00').
 * @param {string} end_time - The end time of the block as a string (e.g.: '8:00', '12:00').
 * @returns {boolean} - Returns true if operation is successful.
 */
async function createBlock(schedule_id, room_id, activity_id, start_time, end_time) {
    var query;

    if (schedule_id === undefined) {
        query = `INSERT INTO Block(room_id, activity_id, start_time, end_time) VALUES('${room_id}', '${activity_id}', '${start_time}', '${end_time}');`;
    } else {
        query = `INSERT INTO Block(room_id, activity_id, start_time, end_time, schedule_id) VALUES('${room_id}', '${activity_id}', '${start_time}', '${end_time}', '${schedule_id}');`;
    }
    try {
        await client.query(query);
        return true;
    } catch (err){
        throw new Error(err);
    }
}

/**
 * Deletes all Blocks in the database.
 * @async
 * @function deleteAllBlocks
 * @returns {boolean} - Returns a boolean that is true if operation is successful
 */
async function deleteAllBlocks() {

    const query = `DELETE FROM Block;`;
    try {
        await client.query(query);
        return true;
    } catch (err){
        throw new Error(err);
    }
}

/**
 * Reset Block ID counter in the database.
 * @async
 * @function resetBlockIds
 * @returns {boolean} - Returns a boolean that is true if operation is successful
 */
async function resetBlockIds() {

    const query = `ALTER SEQUENCE block_block_id_seq RESTART WITH 1;`;
    try {
        await client.query(query);
        return true;
    } catch (err){
        throw new Error(err);
    }
}

module.exports = {
    getBlockById,
    getAllBlocks,
    createBlock,
    deleteAllBlocks,
    resetBlockIds
}