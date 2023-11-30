/**
 * This module implements DB operations for the account service.
 * 
 * @module api/db/activityDbPlugin
 * 
 * @requires api/entities/Activity
 * @requires api/db/db
 */

const config = require("config");
const Activity = require("../entities/Activity");
const accountRoutes = require("../routes/accountRoutes");
const { client } = require('./db');
const CAMPUS_ID = config.get('campus');

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
        row.camp_id,
        new Array()
    );
}

/** Get all activities from the database.
 * 
 * @returns an array of all Activity objects in the database.
 */
async function getAllActivities() {
    const query = `SELECT * FROM Activity;`;
    const rquery = `SELECT room_id FROM RoomActivity WHERE activity_id = $1;`;
    var all_activities;

    try {
        var result = await client.query(query);

        if (result && result.rowCount > 0) {
            var rows = result.rows;
        
            all_activities = rows.map(mapRowToActivity);
            if (all_activities === undefined) {
                return all_activities;
            }

            for (var i=0; i<all_activities.length; i++) {
                result = await client.query(rquery, [all_activities[i].activity_id]);
                rows = result.rows;
                if (rows === undefined) {
                    continue;
                }
                for (var j=0; j<rows.length; j++) {
    
                    all_activities[i].rooms.push(rows[j].room_id);
                }
            }
            
            return all_activities;

        } else {
            return [];
        }

    } catch (err){
        throw new Error(err);
    }
}

/**
 * Create room/activity pair resource in DB
 * 
 * @param {string} activity_id the activity ID
 * @param {string} room_id the room ID
 * @returns true if the operation is successful
 */
async function createRoomActivities(activity_id, room_id) {
  const query = `Insert into RoomActivity values ($1, $2);`;  

  const values = [activity_id, room_id];
  try {
      const result = await client.query(query, values);
      return true;

  } catch (err) {
        throw new Error(err);
  }

}

/**
 * Creates a new activity resource in the DB.
 * 
 * @param {string} name Name of activity
 * @param {number} duration Duration of activity in hours
 * @param {number} type Whether the activity is a FILLER_TYPE or COMMON_TYPE
 * @param {number} num_occurences The number of occurences of the activity
 * @param {string} camp_id The associated camp ID of the activity
 * @param {set} room_ids The room IDs associated witht the activity
 * @returns true if the operation is successful
 */
async function createActivity(name, duration, type, num_occurences, camp_id, room_ids) {
    const query = `
        INSERT INTO Activity (name, duration, type, num_occurences, camp_id)
        VALUES ($1, $2, $3, $4, $5)
        RETURNING activity_id;
    `;
    try {
        const result = await client.query(query, [name, duration, type, num_occurences, CAMPUS_ID]);
        const activity_id = result.rows[0].activity_id;
        if (room_ids === undefined || room_ids.length === 0) {
            return true;
        }
        ids = room_ids.split(',').filter(id => id !== '');
        for (id of ids) {
            try {
                await createRoomActivities(activity_id, id);
            }
            catch (err) {
                throw new Error(err);
            }
        }
        return true;
    } catch (err) {
        throw new Error(err);
    }
}

/**
 * Deletes all room/activity pairs with the given activity ID.
 * 
 * @param {string} activity_id The activity ID for the room activity pair to be deleted.
 * @returns true if operation is successful
 */
async function clearRoomActivities(activity_id) {
  const query = `Delete From RoomActivity where activity_id = $1;`;  

  const values = [activity_id];
  try {
      const result = await client.query(query, values);
      return true;
  } catch (err) {
        throw new Error(err);
  }
}

/**
 * Edit an existing activity entity with the given activity ID.
 * 
 * @param {string} activity_id The ID corresponding to the activity to be edited
 * @param {string} name Name of activity
 * @param {number} duration Duration of activity in hours
 * @param {number} type Whether the activity is a FILLER_TYPE or COMMON_TYPE
 * @param {number} num_occurences The number of occurences of the activity
 * @param {string} camp_id The associated camp ID of the activity
 * @returns true if operation is successful
 */
async function editActivityById(activity_id, name, duration, type, num_occurences, camp_id, room_ids) {
    const query = `
        UPDATE Activity
        SET
            name = $1,
            duration = $2,
            type = $3,
            num_occurences = $4,
            camp_id = $5
        WHERE
        activity_id = $6
        RETURNING *;
    `;

    try {
        await client.query(query, [
            name,
            duration,
            type,
            num_occurences,
            camp_id,
            activity_id,
        ]);

        if (room_ids !== undefined) {
            try {
                // First delete all RoomActivity related to this activity.
                clearRoomActivities(activity_id);
                // Then insert the new ones
                ids = room_ids.split(',').filter(id => id !== '');
                for (id of ids) {
                    try {
                        await createRoomActivities(activity_id, id);
                    }
                    catch (err) {
                        throw new Error(err);
                    }
                }
            }
            catch (err) {
                throw new Error(err);
            }
        }
        return true;
    } catch (err) {
        throw new Error(err);
    }

}

/** Delete an activity from database with given activity ID..
 * 
 * @param {string} activity_id The corresponding activity ID
 * @returns true if operation is successful
 */
async function deleteActivityById(activity_id) {
    const query = `DELETE FROM Activity WHERE activity_id = $1 RETURNING *;`;
    try {
        const result = await client.query(query, [activity_id]);
        const deleted = result.rows[0];
        if (deleted !== undefined && deleted.room_ids !== undefined) {
            const dquery = `DELETE FROM RoomActivity WHERE activity_id = $1 RETURNING *;`
            try {
                await client.query(dquery, [activity_id]);
                return true;
            }
            catch (err) {
                throw new Error(err);
            }
        }
        if (deleted === undefined) {
            return false;
        }
        return true;
    } catch (err) {
        throw new Error(err);
    }
}


module.exports = {
    createActivity,
    editActivityById,
    getAllActivities,
    deleteActivityById
}