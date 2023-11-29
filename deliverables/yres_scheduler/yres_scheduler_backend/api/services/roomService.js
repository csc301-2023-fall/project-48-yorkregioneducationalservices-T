/**
 * This module implements the use case operations for the room service.
 * 
 * @module api/service/roomService
 * 
 * @requires api/db/roomDbPlugin
 * @requires api/entities/ServiceErrors
 */

const db = require('../db/roomDbPlugin');
const {RoomServiceError, STATUS_CODES} = require('../entities/ServiceErrors');

/**
 * Retrieves all room entities from the database.
 *
 * @returns {Array<Room>} - An array of room entities.
 */
async function getAllRooms() {
    try {
        return await db.getAllRooms();
    } catch(err) {
        throw new RoomServiceError(
            `DB Operation Failure: ${err}`,
            STATUS_CODES.FAILED
        );
    }
}

/**
 * Creates a room entity resource in the database.
 * 
 * @param name The name of the room
 * @param campus_id The ID of the associated campus
 *
 * @returns {boolean} - Whether operation succeeded
 */
async function createRoom(
    name,
    campus_id) {

    try {
        return await db.createRoom(name, campus_id);
    } catch(err) {
        throw new RoomServiceError(
            `DB Operation Failure: ${err}`,
            STATUS_CODES.FAILED
        );
    }
}

/**
 * Edit a room entity resource in the database.
 * 
 * @param room Object representing room
 *
 * @returns {boolean} - Whether operation succeeded
 */
async function editRoomById(room_id, room_name) {

    try {
        return await db.editRoomById(oom_id, room_name);
    } catch(err) {
        throw new RoomServiceError(
            `DB Operation Failure: ${err}`,
            STATUS_CODES.FAILED
        );
    }
}

/**
 * Delete a room entity in the database with given room ID.
 * 
 * @param room_id The ID for the room
 * 
 * @returns {boolean} - Whether operation succeeded
 */
async function deleteRoomById(room_id) {
    try {
        return await db.deleteRoomById(room_id);
    } catch(err) {
        throw new RoomServiceError(
            `DB Operation Failure: ${err}`,
            STATUS_CODES.FAILED
        );
    }
}

module.exports = {
    getAllRooms,
    createRoom,
    editRoomById,
    deleteRoomById
}