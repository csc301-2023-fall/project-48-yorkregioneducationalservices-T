/**
 * This module implements the controller for requests for block service 
 * operations.
 * 
 * @module api/controllers/blockController
 * 
 * @requires api/services/blockService
 * @requires api/entities/ServiceErrors
 */

const blockService = require('../services/blockService');
const {STATUS_CODES} = require('../entities/ServiceErrors');

/**
 * Retrieves a block by ID.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @returns {Object} - An object containing a block.
 */
async function getBlock(req, res) {
    const block_id = req.params.block_id;

    const block = await blockService.getBlock(block_id)

    res.status(STATUS_CODES.SUCCESS);

    return {
        block: block
    };
}

/**
 * Retrieves all blocks.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @returns {Object} - An object containing an array of blocks with start and end time strings.
 */
async function getAllBlocks(req, res) {
    const allblocks = await blockService.getAllBlocks();

    res.status(STATUS_CODES.SUCCESS);

    return {
        blocks: allblocks.map((block) => { 
            return {
                ...block,
                start_time: block.getStartTime(),
                end_time: block.getEndTime()
            };
        })
    };
}

/**
 * Creates a new block.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @returns {Object} - An object containing a status message.
 */
async function createBlock(req, res) {
    const schedule_id = req.body.schedule_id;
    const room_id = req.body.room_id;
    const activity_id = req.body.activity_id;
    const start_time = req.body.start_time;
    const end_time = req.body.end_time;
    

    const status = await blockService.createBlock(schedule_id, room_id, activity_id, start_time, end_time);
    
    res.status(STATUS_CODES.CREATED);

    return {
        status: status ? 'Success' : 'failure'
    };
}

/**
 * Deletes all blocks.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @returns {Object} - An object containing a status message.
 */
async function deleteAllBlocks(req, res) {
    const status = await blockService.deleteAllBlocks();

    res.status(STATUS_CODES.SUCCESS);

    return {
        status: status ? 'Success' : 'failure'
    };
}


module.exports = {
    getBlock,
    getAllBlocks,
    createBlock,
    deleteAllBlocks
}