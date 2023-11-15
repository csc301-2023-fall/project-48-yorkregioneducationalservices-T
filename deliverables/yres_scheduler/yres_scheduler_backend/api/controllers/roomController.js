/** Room Controller
 * 
 */
const { contentSecurityPolicy } = require('helmet');
const db = require('../db/roomDbPlugin');
const uuid = require('uuid');

/** Get all rooms by ID of campus that they belong to.
 * 
 * @param {JSON} req - GET request with query parameter campus_id.
 * @returns JSON representation of all rooms
 */
async function getAllRoomsByCampusId(req, res) {
    const campus_id = req.query.campus_id;
    if (isNaN(campus_id)) {
        console.log('getAllRooms - Bad request: missing query parameter');
        throw Error('getAllRooms - Bad request: missing query parameter');
    }
    const all_rooms = await db.getRoomsByCampusId(campus_id);
    return {
        rooms: all_rooms
    };
}

/** Get all rooms in the database.
 * 
 * @returns JSON representation of all rooms
 */
async function getAllRooms(req, res) {
    const all_rooms = await db.getAllRooms();
    return {
        rooms: all_rooms
    };
}

/** Create a room data row in the database with given information.
 * 
 * @param {JSON} req - POST request with body containing name and campus_id of the room.
 * @returns if the insertion succeeded.
 */
async function createRoom(req, res) {
    const name = req.body.name;
    const campus_id = req.body.campus_id;
    if (isNaN(name) || isNaN(campus_id)) {
        console.log('createRoom - Bad form: missing parameter');
        throw Error('createRoom - Bad form: missing parameter');
    }
    var succeed = await db.createRoom(uuid.v1(), name, campus_id);
    return {
        status: succeed ? 'Success' : 'failure'
    };
}

/** Delete a room data row in the database with given room_id.
 * 
 * @param {JSON} req - POST request with body containing the room_id for room to be deleted.
 * @returns 
 */
async function deleteRoomById(req, res) {
    const room_id = req.body.room_id;
    if (!uuid.validate(room_id)) {
        console.log('deleteRoom - Bad form: unexpected room_id');
        throw Error('deleteRoom - Bad form: unexpected room_id');
    }
    const status = await db.deleteRoomById(room_id);

    return {
        status: status ? 'Success' : 'failure'
    }
}

module.exports = {
    getAllRoomsByCampusId,
    getAllRooms,
    createRoom,
    deleteRoomById
}