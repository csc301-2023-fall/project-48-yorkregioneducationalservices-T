/**
 * This module specifies the routes for request endpoints in the room service.
 * 
 * @param {Object} [app] The express application
 * 
 * @module api/routes/roomRoutes
 * @requires api/controllers/roomController
 */

const roomController = require('../controllers/roomController');

const roomRoutes = (app) => {

    /**
     * Route to get all rooms.
     * @name GET /room/all/
     * @memberof module:routes/roomRoutes
     * @param {Object} req - The Express request object.
     * @param {Object} res - The Express response object.
     */
    app.get('/room/all/', async (req, res) => {
        const all_rooms = await roomController.getAllRooms(req, res);    
        res.send(all_rooms);
    })

    /**
     * Route to create a new room.
     * @name POST /room/create/
     * @memberof module:routes/roomRoutes
     * @param {Object} req - The Express request object.
     * @param {Object} res - The Express response object.
     */
    .post('/room/create/', async (req, res) => {
        const resp = await roomController.createRoom(req, res);
        res.send(resp);
    })

    /**
     * Route to delete a room by its ID.
     * @name DELETE /room/:room_id
     * @memberof module:routes/blockRoutes
     * @param {Object} req - The Express request object.
     * @param {Object} res - The Express response object.
     */
    .delete('/room/:room_id', async (req, res) => {
        const resp = await roomController.deleteRoomById(req, res);
        res.send(resp);
    })

    /**
     * Route to edit a room by its ID.
     * @name POST /room/edit
     * @memberof module:routes/roomRoutes
     * @param {Object} req - The Express request object.
     * @param {Object} res - The Express response object.
     */
    .post('/rooms/edit', async (req, res) => {
        const resp = await roomController.editRoomsById(req, res);
        res.send(resp);
    });
};

module.exports = roomRoutes;