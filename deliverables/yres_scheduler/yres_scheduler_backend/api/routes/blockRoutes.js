const blockService = require('../controllers/blockController');

module.exports = (app) => {
    app.get('/block/get', async (req, res) => {
        const block = await blockService.getBlock(req, res)
        res.send(block);
    })

    .get('/block/getAll', async (req, res) => {
        const all_blocks = await blockService.getAllBlocks(req, res)
        res.send(all_blocks);
    })

    .post('/block/create', async (req, res) => {
        const status = await blockService.createBlock(req, res);
        res.status(200).send(status);
    })

    .delete('/block/deleteAll', async (req, res) => {
        const status = await blockService.deleteAllBlocks(req, res);
        res.status(200).send(status);
    });
};