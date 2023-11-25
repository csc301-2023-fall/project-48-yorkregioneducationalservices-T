/**
 * This module specifies the routes for request endpoints in the block Service.
 * 
 * @param {Object} [app] The express application
 * 
 * @module api/routes/blockRoutes
 * @requires api/controllers/blockController
 * @requires api/middleware/errorHandler
 * @requires api/middleware/authHandler
 */

const blockService = require('../controllers/blockController');

const blockRoutes = (app) => {

    /**
     * Route to get all blocks.
     * @name GET /block/all/
     * @function
     * @memberof module:routes/blockRoutes
     * @param {Object} req - The Express request object.
     * @param {Object} res - The Express response object.
     * @returns {Promise} A Promise that resolves to the result of the getAllBlocks function.
     */
    app.get('/block/all', async (req, res) => {
        const all_blocks = await blockService.getAllBlocks(req, res);
        res.send(all_blocks);
    })

    /**
     * Route to get a block by id.
     * @name GET /block/:block_id
     * @function
     * @memberof module:routes/blockRoutes
     * @param {Object} req - The Express request object.
     * @param {Object} res - The Express response object.
     * @returns {Promise} A Promise that resolves to the result of the getBlock function.
     */
    .get('/block/:block_id', async (req, res) => {
        const block = await blockService.getBlock(req, res);
        res.send(block);
    })

    /**
     * Route to create a new block.
     * @name POST /block/create/
     * @function
     * @memberof module:routes/blockRoutes
     * @param {Object} req - The Express request object.
     * @param {Object} res - The Express response object.
     * @returns {Promise} A Promise that resolves to the result of the createBlock function.
     */
    .post('/block/create/', async (req, res) => {
        const status = await blockService.createBlock(req, res);
        res.send(status);
    })

    /**
     * Route to delete all blocks.
     * @name DELETE /block/all
     * @function
     * @memberof module:routes/blockRoutes
     * @param {Object} req - The Express request object.
     * @param {Object} res - The Express response object.
     * @returns {Promise} A Promise that resolves to the result of the deleteAllBlocks function.
     */
    .delete('/block/all/', async (req, res) => {
        const status = await blockService.deleteAllBlocks(req, res);
        res.send(status);
    });
};

module.exports = blockRoutes;