/** Room Service
 * 
 */
const db = require('../db/psqlDbPlugin');

/** Get a room by room_id.
 * @returns JSON representation of the room.
 */
function getRoom(room_id) {
    var room = db.getRoomById(room_id);

    return room;

}
/** Get all room of a campus with specified campus_id.
 * @returns JSON list of all rooms in the campus.
 */
function getAllRooms(campus_id) {
    var all_rooms = db.getRoomsByCampusId(campus_id);
    return JSON.stringify(all_rooms);
}

module.exports = {
    getRoom
}