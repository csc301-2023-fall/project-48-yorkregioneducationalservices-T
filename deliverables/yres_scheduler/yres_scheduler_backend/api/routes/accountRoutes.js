/**
 * This module specifies the routes for request endpoints in the account Service.
 * 
 * @param {Object} [app] The express application
 * 
 * @module api/routes/accountRoutes
 * @requires api/controllers/accountController
 * @requires api/middleware/errorHandler
 * @requires api/middleware/authHandler
 */

const accountController = require('../controllers/accountController');
const auth = require('../middleware/authHandler');

const accountRoutes = (app) => {

    /**
     * Route to login admin account
     * @name POST /account/login/
     * @memberof module:api/routes/accountRoutes
     * @param {Object} req - The Express request object.
     * @param {Object} res - The Express response object.
     */
    app.post('/account/login/', async (req, res) => {
        res.send(await accountController.login(req, res));
    });

    /**
     * Route to create new admin account
     * @name POST /account/signup/
     * @memberof module:api/routes/accountRoutes
     * @param {Object} req - The Express request object.
     * @param {Object} res - The Express response object.
     */
    app.post('/account/signup/', async (req, res) => {
        res.send(await accountController.signup(req, res));
    });

    /**
     * Route to check login status
     * @name GET /account/login/
     * @memberof module:api/routes/accountRoutes
     * @param {Object} req - The Express request object.
     * @param {Object} res - The Express response object.
     */
    app.get('/account/login/', async (req, res) => {
        res.send(await accountController.getLoginStatus(req, res));
    });
    
    /**
    * Route to clear database.
    * @name DELETE /database/
    * @memberof module:api/routes/accountRoutes
    * @param {Object} req - The Express request object.
    * @param {Object} res - The Express response object.
    */
    app.delete('/database/', auth, async (req, res) => {
       const status = await accountController.clearDatabase(req, res);
       res.send(status);
    });
};

module.exports = accountRoutes;
