/**
 * This module specifies the routes for request endpoints in the block Service.
 * 
 * @param {Object} [app] The express application
 * 
 * @module api/routes/blockRoutes
 * @requires api/controllers/blockController
 * @requires api/middleware/authHandler
 */

const blockController = require('../controllers/blockController');
const auth = require('../middleware/authHandler');

const blockRoutes = (app) => {

    /**
     * Route to get all blocks.
     * @name GET /block/all/
     * @memberof module:routes/blockRoutes
     * @param {Object} req - The Express request object.
     * @param {Object} res - The Express response object.
     */
    app.get('/block/all', auth, async (req, res) => {
        const all_blocks = await blockController.getAllBlocks(req, res);
        res.send(all_blocks);
    })


    /**
     * Route to get a block by id.
     * @name GET /block/:block_id
     * @memberof module:routes/blockRoutes
     * @param {Object} req - The Express request object.
     * @param {Object} res - The Express response object.
     */
    .get('/block/:block_id', auth, async (req, res) => {
        const block = await blockController.getBlock(req, res);
        res.send(block);
    })
    

    /**
     * Route to create a new block.
     * @name POST /block/create/
     * @memberof module:routes/blockRoutes
     * @param {Object} req - The Express request object.
     * @param {Object} res - The Express response object.
     */
    .post('/block/create/', auth, async (req, res) => {
        const status = await blockController.createBlock(req, res);
        res.send(status);
    })

    /**
     * Route to delete all blocks.
     * @name DELETE /block/all
     * @memberof module:routes/blockRoutes
     * @param {Object} req - The Express request object.
     * @param {Object} res - The Express response object.
     */
    .delete('/block/all/', auth, async (req, res) => {
        const status = await blockController.deleteAllBlocks(req, res);
        res.send(status);
    });
};

module.exports = blockRoutes;