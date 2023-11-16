const blockService = require('../services/blockService');

async function getBlock(req, res) {
    const block_id = req.body.block_id;

    const block = await blockService.getBlock(block_id)

    return {
        block: block
    };
}

async function getAllBlocks(req, res) {
    const allblocks = await blockService.getAllBlocks();

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

async function createBlock(req, res) {
    const schedule_id = req.body.schedule_id;
    const room_id = req.body.room_id;
    const activity_id = req.body.activity_id;
    const start_time = req.body.start_time;
    const end_time = req.body.end_time;
    

    const status = await blockService.createBlock(schedule_id, room_id, activity_id, start_time, end_time);

    return {
        status: status ? 'Success' : 'failure'
    };
}

async function deleteAllBlocks(req, res) {
    const status = await blockService.deleteAllBlocks();

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