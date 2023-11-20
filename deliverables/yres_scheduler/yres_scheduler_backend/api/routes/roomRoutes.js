const roomService = require('../controllers/roomController');

/**
 * Defines the routes for room-related API endpoints.
 * @param {Object} app - The Express application object.
 */
module.exports = (app) => {
    /**
     * 
     */
    app.get('/rooms/getAllRooms/', async (req, res) => {
        try {
            const all_rooms = await roomService.getAllRooms(req, res);    
            res.send(all_rooms);
        } catch (error) {
            res.status(500).send(error);
        }
    })
    /**
     * 
     */
    .post('/rooms/createRoom/', async (req, res) => {
        try {
            const resp = await roomService.createRoom(req, res);

            res.status(200).send('Success');

            
        } catch (error) {
            res.status(500).send(error);
        }
    })
    /**
     * 
     */
    .post('/rooms/deleteRoomById/', async (req, res) => {
        try {
            const resp = await roomService.deleteRoomById(req, res);
            res.send(resp);
            
        } catch (error) {
            console.log(error);
            res.status(500).send(error);
        }
    })
    .post('/rooms/editRoomsById/', async (req, res) => {
        try {
            const resp = await roomService.editActivityById(req, res);
            res.send(resp);
            
        } catch (error) {
            console.log(error);
            res.status(500).send(error);
        }
    });
};