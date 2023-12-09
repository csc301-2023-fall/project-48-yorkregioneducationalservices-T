/**
 * This module specifies the routes for request endpoints in the camp Service.
 * 
 * @param {Object} [app] The express application
 * 
 * @module api/routes/campRoutes
 * @requires api/controllers/campController
 * @requires api/middleware/authHandler
 * @requires multer
 */

const campController = require('../controllers/campController');
const auth = require('../middleware/authHandler');
const multer = require('multer');

const stor = multer.diskStorage({
    destination: "./api/res/public",
    filename: (req, file, cb) => {
        cb(null, "floorplan.jpg")
    }
});

function jpegFilter(req, file, cb) {
    if (file.mimetype === "image/jpeg" || file.mimetype === "image/jpg") {
        cb(null, true)
    } else {
        cb(null, false)
    }
}

const uploadFloorplanImage = multer({
    storage: stor,
    limits: {
        fileFilter: jpegFilter
    }
}).single('floorplan');

const campRoutes = (app) => {

    /**
     * Route to get all camps.
     * @name GET /camp/all
     * @memberof module:routes/campRoutes
     * @param {Object} req - The Express request object.
     * @param {Object} res - The Express response object.
     */
    app.get('/camp/all', auth, async (req, res) => {
        const all_camps = await campController.getAllCamps(req, res);
        res.send(all_camps);
    })

    /**
     * Route to get a camp by id.
     * @name GET /camp/:camp_id/
     * @memberof module:routes/campRoutes
     * @param {Object} req - The Express request object.
     * @param {Object} res - The Express response object.
     */
    .get('/camp/:camp_id', auth, async (req, res) => {
        const camp = await campController.getCamp(req, res);
        res.send(camp);
    })

    /**
     * Route to create a new camp.
     * @name GET /camp/create/
     * @memberof module:routes/campRoutes
     * @param {Object} req - The Express request object.
     * @param {Object} res - The Express response object.
     */
    .post('/camp/create', auth, async (req, res) => {
        const status = await campController.createCamp(req, res);
        res.send(status);
    })

    /**
     * Route to set floorplan
     * @name POST /camp/floorplan/
     * @memberof module:routes/campRoutes
     * @param {Object} req - The Express request object.
     * @param {Object} res - The Express response object.
     */
    .post('/camp/floorplan', [auth, uploadFloorplanImage], async (req, res) => {
        const status = await campController.setFloorplan(req, res);
        res.send(status);
    });
};

module.exports = campRoutes;