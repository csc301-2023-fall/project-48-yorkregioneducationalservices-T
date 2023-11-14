const blockService = require('../services/blockService');

async function getBlock(req, res) {
    const block_id = req.body.block_id;

    const block = await blockService.getBlock(block_id);

    return {
        block: block
    }
}

module.exports = {
    getBlock
}