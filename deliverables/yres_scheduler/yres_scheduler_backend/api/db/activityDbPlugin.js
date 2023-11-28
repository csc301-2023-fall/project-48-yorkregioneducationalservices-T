const { all } = require("mathjs");
const Activity = require("../entities/Activity");
const accountRoutes = require("../routes/accountRoutes");
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
    return new Promise(async (resolve, reject) => {
        var result = await new Promise((queryResolve, queryReject) => {
            client.query(query, (err, result) => {
                if (err) {
                    queryReject(err);
                } else {
                    queryResolve(result);
                }
            });
        });
        var rows = result.rows;
        
        all_activities = rows.map(mapRowToActivity);
        if (all_activities === undefined) {
            resolve(all_activities);
        }

        for (var i=0; i<all_activities.length; i++) {
            result = await new Promise((queryResolve, queryReject) => {
                client.query(rquery, [all_activities[i].activity_id], (err, result) => {
                    if (err) {
                        queryReject(err);
                    } else {
                        queryResolve(result);
                    }
                });
            });
            rows = result.rows;
            if (rows === undefined) {
                continue;
            }
            for (var j=0; j<rows.length; j++) {

                all_activities[i].rooms.push(rows[j].room_id);
            }
        }

        resolve(all_activities);
    });
}

async function createRoomActivities(activity_id, room_id) {
  const queryCreateRoomActivity = `Insert into RoomActivity values ($1, $2);`;  

  const values = [activity_id, room_id];
  try {
      const result = await client.query(queryCreateRoomActivity, values);

  } catch (error) {
      // Handle errors appropriately
      console.error('Error while creating RoomActivities:', error);
      throw new Error('Failed to create RoomActivities');
  }

}

/** Write an Activity to database.
 * 
 */
async function createActivity(name, duration, type, num_occurences, camp_id, room_ids) {
    const query = `
        INSERT INTO Activity (name, duration, type, num_occurences, camp_id)
        VALUES ($1, $2, $3, $4, $5)
        RETURNING activity_id;
    `;
    try {
        var result = await client.query(query, [name, duration, type, num_occurences, camp_id]);
        if (room_ids === undefined || room_ids.length === 0) {
            return true;
        }
        ids = room_ids.split(',').filter(id => id !== '');
        for (id of ids) {
            try {
                createRoomActivities(parseInt(result.rows[0].activity_id), id);
            }
            catch (err) {
                console.log(err);
                return false;
            }
        }
        return true;
    } catch (err) {
        console.log(err);
        return false; 
    }
    // TODO: write the list of rooms of this activity
    //
}

async function clearRoomActivities(activity_id) {
  const queryCreateRoomActivity = `Delete From RoomActivity where activity_id = $1;`;  

  const values = [activity_id];
  try {
      const result = await client.query(queryCreateRoomActivity, values);

  } catch (error) {
      // Handle errors appropriately
      console.error('Error while deleting RoomActivities:', error);
      throw new Error('Failed to delete RoomActivities');
  }

}

async function editActivityById(activity) {
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
    console.log(activity);
    try {
        await client.query(query, [
            activity.name,
            activity.duration,
            activity.type,
            activity.num_occurences,
            activity.camp_id,
            activity.activity_id,
        ]);

        if (activity.room_ids !== undefined) {
            try {
                // First delete all RoomActivity related to this activity.
                clearRoomActivities(activity.activity_id);
                // Then insert the new ones
                ids = activity.room_ids.split(',').filter(id => id !== '');
                for (id of ids) {
                    try {
                        createRoomActivities(activity.activity_id, id);
                    }
                    catch (err) {
                        console.log(err);
                        return false;
                    }
                }
            }
            catch (err) {
                console.log(err);
                return false;
            }
        }
        return true;
    } catch (err) {
        console.log(err);
        return false; 
    }

}

/** Delete an Activity from database with given activity_id.
 * 
 * @param {number} activity_id - activity id number.
 * @returns true if deleted successfully.
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
                console.log(err);
                return false;
            }
        }
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
    editActivityById,
    getAllActivities,
    deleteActivityById
}