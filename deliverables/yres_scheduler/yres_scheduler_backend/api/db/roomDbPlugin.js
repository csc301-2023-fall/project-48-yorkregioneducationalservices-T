const Room = require("../entities/Room");
const { client } = require('./db')

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
 *  @param {string} campus_id - ID of the campus from which to get all rooms.
 *  @returns an array of Room objects with the given campus_id. Empty array is returned if the campus_id does not exist.
 */
async function getRoomsByCampusId(campus_id) {
    const queryGetAllRooms = `SELECT * FROM Room WHERE campus_id = $1;`;
    
    var all_rooms;
    return new Promise(async (resolve, reject) => {
        const result = await new Promise((queryResolve, queryReject) => {
            client.query(queryGetAllRooms, [campus_id], (err, result) => {
                if (err) {
                    queryReject(err);
                } else {
                    queryResolve(result);
                }
            });
        });
        const rows = result.rows;

        all_rooms = rows.map(mapRowToRoom);

        resolve(all_rooms)
    });
}

/** Get all rooms from the database.
 * 
 * @returns an array of all Room objects in the database.
 */
async function getAllRooms() {
    const queryGetAllRooms = `SELECT * FROM Room;`;
    
    var all_rooms;
    return new Promise(async (resolve, reject) => {
        const result = await new Promise((queryResolve, queryReject) => {
            client.query(queryGetAllRooms, (err, result) => {
                if (err) {
                    queryReject(err);
                } else {
                    queryResolve(result);
                }
            });
        });
        const rows = result.rows;

        all_rooms = rows.map(mapRowToRoom);

        resolve(all_rooms)
    });
}

/** Write a Room to database.
 * 
 * @param {string} room_id - room UUID.
 * @param {string} name - room name.
 * @param {string} campus_id - ID of campus this room belongs to.
 * @returns true if written successfully.
 */
async function createRoom(room_id, name, campus_id) {
    const query = `
        INSERT INTO Room (room_id, name, campus_id)
        VALUES ($1, $2, $3)
        RETURNING room_id;
    `;
    try {
        const result = await client.query(query, [room_id, name, campus_id]);
        return true;
    } catch (err) {
        console.log(err);
        return false; 
    }
}

/** Delete a Room from database with given room_id.
 * 
 * @param {string} room_id - room UUID.
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
        console.log(err);
        return false;
    }
}


module.exports = {
    createRoom,
    getRoomsByCampusId,
    getAllRooms,
    deleteRoomById
}