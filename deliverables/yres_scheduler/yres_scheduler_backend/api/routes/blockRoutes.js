const blockService = require('../controllers/blockController');

module.exports = (app) => {

    /**
     * Route to get a block by id.
     * @name GET /block/get/
     * @function
     * @memberof module:routes/blockRoutes
     * @param {Object} req - The Express request object.
     * @param {Object} res - The Express response object.
     * @returns {Promise} A Promise that resolves to the result of the getBlock function.
     */
    /*
    app.get('/block/get/', async (req, res) => {
        const block = await blockService.getBlock(req, res);
        res.send(block);
    })
    */

    /**
     * Route to get all blocks.
     * @name GET /block/getAll/
     * @function
     * @memberof module:routes/blockRoutes
     * @param {Object} req - The Express request object.
     * @param {Object} res - The Express response object.
     * @returns {Promise} A Promise that resolves to the result of the getAllBlocks function.
     */
    app.get('/block/getAll/', async (req, res) => {
        const all_blocks = await blockService.getAllBlocks(req, res);
        res.send(all_blocks);
    })

    /**
     * Route to create a new block.
     * @name GET /block/create/
     * @function
     * @memberof module:routes/blockRoutes
     * @param {Object} req - The Express request object.
     * @param {Object} res - The Express response object.
     * @returns {Promise} A Promise that resolves to the result of the createBlock function.
     */
    .post('/block/create/', async (req, res) => {
        const status = await blockService.createBlock(req, res);
        res.status(200).send(status);
    })

    /**
     * Route to delete all blocks.
     * @name GET /block/deleteAll/
     * @function
     * @memberof module:routes/blockRoutes
     * @param {Object} req - The Express request object.
     * @param {Object} res - The Express response object.
     * @returns {Promise} A Promise that resolves to the result of the deleteAllBlocks function.
     */
    .delete('/block/deleteAll/', async (req, res) => {
        const status = await blockService.deleteAllBlocks(req, res);
        res.status(200).send(status);
    });
};