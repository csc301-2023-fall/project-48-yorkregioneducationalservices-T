const roomService = require('../controllers/roomController');
const logger = require('../../logger');
const { log } = require('mathjs');
/**
 * Defines the routes for room-related API endpoints.
 * @param {Object} app - The Express application object.
 */
module.exports = (app) => {
    /**
     * 
     */
    app.get('/rooms/getAllRooms/', async (req, res) => {
        logger.info(`GET /rooms/getAllRooms/`);
        try {
            const result = await roomService.getAllRooms(req, res);    
            res.status(STATUS_CODES.SUCCESS).send(result);
        } catch (error) {
            logger.error(`Error in GET /rooms/getAllRooms/: `, error);
            res.status(STATUS_CODES.FAILED).send( { result: null, status: STATUS_CODES.FAILED, error: error.message } );
        }
    })
    /**
     * 
     */
    .post('/rooms/createRoom/', async (req, res) => {
        logger.info(`POST /rooms/createRoom/`);
        try {
            const result = await roomService.createRoom(req, res);

            res.status(STATUS_CODES.SUCCESS).send(result);

        
        } catch (error) {
            logger.error(`Error in POST /rooms/createRoom/: `, error);
            res.status(STATUS_CODES.FAILED).send( { result: null, status: STATUS_CODES.FAILED, error: error.message } );
        }
    })
    /**
     * 
     */
    .post('/rooms/deleteRoomById/', async (req, res) => {
        logger.info(`POST /rooms/deleteRoomById/`);
        try {
            const result = await roomService.deleteRoomById(req, res);
            res.status(STATUS_CODES.SUCCESS).send(result);
            
        } catch (error) {
            logger.error(`Error in POST /rooms/deleteRoomById/: `, error);
            res.status(STATUS_CODES.FAILED).send( { result: null, status: STATUS_CODES.FAILED, error: error.message } );
        }
    })
    .post('/rooms/editRoomById/', async (req, res) => {
        logger.info(`POST /rooms/editRoomById/`);
        try {
            const result = await roomService.editRoomsById(req, res);
            res.status(STATUS_CODES.SUCCESS).send(result);
            
        } catch (error) {
            logger.error(`Error in POST /rooms/editRoomById/: `, error);
            res.status(STATUS_CODES.FAILED).send( { result: null, status: STATUS_CODES.FAILED, error: error.message } );
        }
    });
};