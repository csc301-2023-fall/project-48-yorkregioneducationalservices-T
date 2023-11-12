/** Room Controller
 * 
 */
const roomService = require('../services/roomService');

function getRoom(req, res) {
    const room_id = req.body.room_id;
    const room = roomService.getRoom(room_id);

    return {
        room: room
    }
}

function getAllRooms(req, res) {
    const campus_id = req.body.campus_id;

    return roomService.getAllRooms(campus_id);
}

module.exports = {
    getRoom
}