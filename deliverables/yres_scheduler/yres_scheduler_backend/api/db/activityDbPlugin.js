const Room = require("../entities/Activity");
const { client } = require('./db')

/**
 * Maps a row from the activity table to an Activity object.
 * @param {Object} row - The row from the activity table.
 * @returns {Activity} A new Activity object.
 */
function mapRowToActivity(row) {
    return new Activity(
        row.activity_id,
        row.name,
        row.duration,
        row.type,
        row.num_occurences,
        new Array()
    );
}

/** Get all activities from the database.
 * 
 * @returns an array of all Activity objects in the database.
 */
async function getAllActivities() {
    const queryGetAllActivities = `SELECT * FROM Activity;`;
    
    var all_activities;
    return new Promise(async (resolve, reject) => {
        const result = await new Promise((queryResolve, queryReject) => {
            client.query(queryGetAllActivities, (err, result) => {
                if (err) {
                    queryReject(err);
                } else {
                    queryResolve(result);
                }
            });
        });
        const rows = result.rows;

        all_activities = rows.map(mapRowToRoom);
        // TODO: fetch the list of rooms of this activity
        //
        resolve(all_activities);
    });
}

/** Write an Activity to database.
 * 
 */
async function createActivity(activity_id, name, duration, type, num_occurences, room_ids) {
    const query = `
        INSERT INTO Activity (activity_id, name, duration, type, num_occurences)
        VALUES ($1, $2, $3, $4, $5)
        RETURNING activity_id;
    `;
    try {
        const result = await client.query(query, [activity_id, name, duration, type, num_occurences]);
        return true;
    } catch (err) {
        console.log(err);
        return false; 
    }
    // TODO: write the list of rooms of this activity
    //
}

/** Delete an Activity from database with given activity_id.
 * 
 * @param {string} activity_id - activity UUID.
 * @returns true if deleted successfully.
 */
async function deleteActivityById(activity_id) {
    const query = `DELETE FROM Activity WHERE activity_id = $1 RETURNING *;`;
    try {
        const result = await client.query(query, [activity_id]);
        const deleted = result.rows[0];
        // TODO: delete the list of rooms of this activity
        //
        if (deleted === undefined) {
            return false;
        }
        return true;
    } catch (err) {
        console.log(err);
        return false;
    }
}


module.exports = {
    createActivity,
    getAllActivities,
    deleteActivityById
}