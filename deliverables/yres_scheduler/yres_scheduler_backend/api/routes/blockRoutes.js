const blockService = require('../controllers/blockController');

module.exports = (app) => {
    app.get('/block/get', async (req, res) => {
        const block = await blockService.getBlock(req, res);
        res.send(block);
    })
};