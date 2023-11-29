/**
 * This module implements the use case operations for the block service.
 * 
 * @module api/service/blockService
 * 
 * @requires api/db/blockDbPlugin
 * @requires api/entities/ServiceErrors
 */

const db = require('../db/blockDbPlugin');
const {BlockServiceError, STATUS_CODES} = require('../entities/ServiceErrors');

/**
 * Retrieves a block object by their ID.
 * @param {number} block_id - The ID of the block to retrieve.
 * @returns {object} - The block object.
 */
async function getBlock(block_id) {

    try {
        const block = await db.getBlockById(block_id);

        if (block == null) {
            throw new BlockServiceError(
                `Block resource with ID '${block_id}' not found in DB`,
                STATUS_CODES.NOT_FOUND
            );
        }

        return block;
    } catch(err) {
        throw new BlockServiceError(
            `DB Operation Failure: ${err}`,
            STATUS_CODES.FAILED
        );
    }
}

/**
 * Retrieves all blocks from the database.
 *
 * @returns {Array<Block>} - An array of Block entities.
 */
async function getAllBlocks() {
    try {
        return await db.getAllBlocks();
    } catch(err) {
        throw new BlockServiceError(
            `DB Operation Failure: ${err}`,
            STATUS_CODES.FAILED
        );
    }
}

/**
 * Creates a new block record in the database.
 * @param {string} schedule_id - The unique identifier of the schedule this block is in (can be null).
 * @param {string} room_id - The unique identifier of the room this block is held in.
 * @param {string} activity_id - The unique identifier of the activity this block is hosting.
 * @param {string} start_time - The start time of the block as a string (e.g.: '8:00', '12:00').
 * @param {string} end_time - The end time of the block as a string (e.g.: '8:00', '12:00').
 * @returns {boolean} - A boolean that is true if the block was created successfully.
 */
async function createBlock(schedule_id, room_id, activity_id, start_time, end_time) {
    
    try {
        return await db.createBlock(schedule_id, room_id, activity_id, start_time, end_time);
    } catch(err) {
        throw new BlockServiceError(
            `DB Operation Failure: ${err}`,
            STATUS_CODES.FAILED
        );
    }
}

/**
 * Deletes all blocks in the database.
 *
 * @returns {boolean} - Whether the delete operation was successful
 */
async function deleteAllBlocks() {

    try {
        return await db.deleteAllBlocks();
    } catch(err) {
        throw new BlockServiceError(
            `DB Operation Failure: ${err}`,
            STATUS_CODES.FAILED
        );
    }
}

module.exports = {
    getBlock,
    getAllBlocks,
    createBlock,
    deleteAllBlocks
}