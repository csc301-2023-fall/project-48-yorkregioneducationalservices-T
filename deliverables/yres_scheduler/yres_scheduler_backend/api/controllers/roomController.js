/**
 * This module implements the controller for requests for room service 
 * operations.
 * 
 * @module api/controllers/roomController
 * 
 * @requires api/services/roomService
 * @requires api/entities/ServiceErrors
 */

const roomService = require('../services/roomService');
const {RoomServiceError, STATUS_CODES} = require('../entities/ServiceErrors');

/**
 * Get all rooms in the database.
 * 
 * @returns {JSON} - JSON representation of all rooms.
 */
async function getAllRooms(req, res) {
    const all_rooms = await roomService.getAllRooms();
    res.status(STATUS_CODES.SUCCESS);
    return {
        rooms: all_rooms
    };
}

/**
 * Create a room data row in the database with given information.
 * 
 * @param {JSON} req - Request with body containing name and campus_id of the room.
 * @returns {Object} - If the insertion succeeded.
 */
async function createRoom(req, res) {
    const name = req.body.name;
    const campus_id = req.body.campus_id;
    if (!name || !campus_id) {
        throw new RoomServiceError(
            `Invalid paramaters provided for request`,
            STATUS_CODES.INVALID
        );
    }

    var succeed = await roomService.createRoom(name, campus_id);
    res.status(STATUS_CODES.CREATED);

    return {
        status: succeed ? 'Success' : 'failure'
    };
}

/**
 * Delete a room data row in the database with given room_id.
 * 
 * @param {JSON} req - Request with parameters containing the room_id for room to be deleted.
 * @returns {Object} - The status of the deletion.
 */
async function deleteRoomById(req, res) {
    const room_id = req.params.room_id;

    if (!room_id) {
        throw new RoomServiceError(
            `Invalid paramaters provided for request`,
            STATUS_CODES.INVALID
        );
    }

    const status = await roomService.deleteRoomById(room_id);

    res.status(STATUS_CODES.SUCCESS);

    return {
        status: status ? 'Success' : 'failure'
    }
}

/**
 * Edit a room data row in the database with given room object.
 * 
 * @param {JSON} req - Request with body containing the updated room object.
 * @returns {Object} - The status of the edit operation.
 */
async function editRoomsById(req, res) {
    const room_id = req.params.room_id;
    const room_name = req.body.name;

    if (!room_id || !room_name) {
        throw new RoomServiceError(
            `Invalid paramaters provided for request`,
            STATUS_CODES.INVALID
        );
    }

    const status = await roomService.editRoomById(oom_id, room_name);

    res.status(STATUS_CODES.SUCCESS);

    return {
        status: status ? 'Success' : 'failure'
    }
}

module.exports = {
    getAllRooms,
    createRoom,
    deleteRoomById,
    editRoomsById
}