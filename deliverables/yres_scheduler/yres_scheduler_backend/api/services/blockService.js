const db = require('../db/psqlDbPlugin');

function getBlock(block_id) {
    var block = db.getBlockById(block_id);

    return block;

}

module.exports = {
    getBlock
}