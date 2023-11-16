const db = require('../db/blockDbPlugin');

async function getBlock(block_id) {
    var block = await db.getBlockById(block_id);

    return block;

}

async function getAllBlocks() {
    var all_blocks = await db.getAllBlocks();
    return all_blocks;
}

function createBlock(schedule_id, room_id, activity_id, start_time, end_time) {
    var block = db.createBlock(schedule_id, room_id, activity_id, start_time, end_time);
    return block;
}

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