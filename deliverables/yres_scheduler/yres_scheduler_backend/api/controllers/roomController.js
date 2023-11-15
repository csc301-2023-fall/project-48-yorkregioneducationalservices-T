/** Room Controller
 * 
 */
const db = require('../db/roomDbPlugin');
const uuid = require('uuid');

/** Get all rooms by ID of campus that they belong to.
 * 
 * @param {JSON} req - GET request with query parameter campus_id.
 * @returns JSON representation of all rooms
 */
async function getAllRoomsByCampusId(req, res) {
    const campus_id = req.query.campus_id;
    if (campus_id == undefined) {
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
    const all_rooms = await db.getAllRooms(campus_id);
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
    if (name == undefined || campus_id == undefined) {
        throw Error('createRoom - Bad form: missing parameter');
    }
    if (!(typeof name === 'string' || name instanceof String) ||
        !(typeof campus_id === 'string' || campus_id instanceof String)) {
            throw Error('createRoom - Bad form: parameter in unexpected type, expecting string');
    }
    var succeed = await db.createRoom(uuid.v1(), name, campus_id);
    return {
        status: succeed ? 'Success' : 'failure'
    };
}


module.exports = {
    getAllRoomsByCampusId,
    getAllRooms,
    createRoom
}