/**
 * This module implements the DB operations for the room service.
 * 
 * @module api/db/roomDbPlugin
 * 
 * @requires api/entities/Room
 * @requires api/db/db
 */

const Room = require("../entities/Room");
const { client } = require('./db')
const config = require('config');
const CAMPUS_ID = config.get('campus');

/**
 * Maps a row from the room table to a Room object.
 * @param {Object} row - The row from the room table.
 * @returns {Room} A new Room object.
 */
function mapRowToRoom(row) {
    return new Room(
        row.room_id,
        row.name,
        row.campus_id
    );
}


/** Get a list of all Room objects of a given campus.
 * 
 *  @param {number} campus_id - ID of the campus from which to get all rooms.
 *  @returns an array of Room objects with the given campus_id. Empty array is returned if the campus_id does not exist.
 */
async function getRoomsByCampusId(campus_id) {
    const query = `SELECT * FROM Room WHERE campus_id = $1;`;
    
    try {
        var all_rooms;
        const result = await client.query(query, [campus_id]);
        const rows = result.rows;

        all_rooms = rows.map(mapRowToRoom);

        return all_rooms;
    } catch(err) {
        throw new Error(err);
    }
        
}

/** Get all rooms from the database.
 * 
 * @returns an array of all Room objects in the database.
 */
async function getAllRooms() {
    const query = `SELECT * FROM Room;`;
    
    try {
        var all_rooms;
        const result = await client.query(query);
        const rows = result.rows;

        all_rooms = await rows.map(mapRowToRoom);
        
        return all_rooms;
    } catch(err) {
        throw new Error(err);
    }
        
}

/** Write a Room to database.
 * 
 * @param {string} name - room name.
 * @param {number} campus_id - ID of campus this room belongs to.
 * @returns true if written successfully.
 */
async function createRoom(name, campus_id) {
    const query = `
        INSERT INTO Room (name, campus_id)
        VALUES ($1, $2)
        RETURNING room_id;
    `;
    try {
        const result = await client.query(query, [name, CAMPUS_ID]);
        return true;
    } catch (err) {
        throw new Error(err);
    }
}

/** Delete a Room from database with given room_id.
 * 
 * @param {number} room_id - room id number.
 * @returns true if deleted successfully.
 */
async function deleteRoomById(room_id) {
    const query = `DELETE FROM Room WHERE room_id = $1 RETURNING *;`;
    try {
        const result = await client.query(query, [room_id]);
        const deleted_room = result.rows[0];

        if (deleted_room === undefined) {
            return false;
        }
        return true;
    } catch (err) {
        throw new Error(err);
    }
}

/** Delete a Room from database with given room_id.
 * 
 * @param {number} room_id - room id number.
 * @returns true if deleted successfully.
 */
async function editRoomById(room_id, room_name) {
    const query = `
        UPDATE Room
        SET name = $2
        WHERE room_id = $1
        RETURNING *;
    `;
    try {
        const result = await client.query(query, [room_id, room_name]);
        const edited_room = result.rows[0];

        if (edited_room === undefined) {
            return false;
        }
        return true;
    } catch (err) {
        throw new Error(err);
    }
}

module.exports = {
    createRoom,
    getRoomsByCampusId,
    getAllRooms,
    deleteRoomById,
    editRoomById
}