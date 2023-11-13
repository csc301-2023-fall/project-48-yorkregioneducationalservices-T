/** Room Routes
 *  
 *  The router responsible for all services related to Room entity.
 */
const roomService = require('../controllers/roomController');

module.exports = (app) => {
    // get a room by giving a room_id
    app.get('/room/get', (req, res) => {
        res.send(roomService.getRoom(req, res));
    })
    // get all rooms of a campus by a campus_id
    .get('/room/getall', (req, res) => {
        res.send(roomService.getAllRooms(req, res));
    });
};