const Camp = require("../entities/Camp");
const uuid = require('uuid');
const { client } = require('./db');

/**
 * Maps a row from the camp table to a Camp object.
 * @param {Object} row - The row from the camp table.
 * @returns {Camp} A new Camp object.
 */
function mapRowToCamp(row) {
    return new Camp(
        row.camp_id,
        row.name,
        new Set(),
        row.campus_id
    );
}

/**
 * Retrieves a camp from the database by their ID.
 *
 * @param {string} camp_id - The ID of the camp to retrieve.
 * @returns {Camp} The retrieved camp object.
 * @throws {Error} If there was an error retrieving the camp from the database.
 */
async function getCampById(camp_id) {

    var name;
    var activity_ids = new Set();
    var campus_id;

    const query_a = `Select * from Camp where camp_id = '${camp_id}';`;
    const query_b = `Select activity_id from Activity where camp_id = '${camp_id}';`;

    try {
        const result_a = await client.query(query_a);
        if (result_a && result_a.rowCount > 0) {
            campus_id = result_a.rows[0].campus_id;
            name = result_a.rows[0].name;

            const result_b = await client.query(query_b);
            if (result_b && result_b.rowCount > 0) {
                for (var i=0; i  < result_b.length; i++) {
                    activity_ids.add(result_b.rows[i].activity_id);
                }
            }

            return new Camp(camp_id, name, activity_ids, campus_id);
            
        } else {
            return null;
        }

    } catch (err){
        throw new Error(err);
    }
}

/**
 * Retrieves activity ids from the database and adds them to the set of activity ids for a given camp.
 * @async
 * @function getActivityIds
 * @param {Object} camp - The camp object for which to retrieve and store activity ids.
 * @param {string} camp.camp_id - The ID of the camp for which to retrieve and store activity ids.
 * @throws {Error} Throws an error if there was an issue fetching activity ids from the database.
 */
async function getActivityIds(camp) {  
    const queryGetActivityIds = `Select activity_id from Activity where camp_id = $1;`;  

    const values = [camp.camp_id];
    try {
        const result = await client.query(queryGetActivityIds, values);
 
        promises = result.rows.map(async (row) => {
            camp.activity_ids.add(row.activity_id);
        });

        await Promise.all(promises);

    } catch (error) {
        // Handle errors appropriately
        console.error('Error while fetching activity ids:', error);
        throw new Error('Failed to fetch activity ids');
    }

  }

/**
 * Retrieves all camps from the database and maps them to Camp objects.
 * 
 * @returns {Promise<Array<Camp>>} A promise that resolves with an array of Camp objects.
 */
async function getAllCamps() {

    var all_camps;

    const query = `SELECT * FROM Camp;`;
    try {
        const result = await client.query(query);

        if (result && result.rowCount > 0) {
            const rows = result.rows;
            all_camps = rows.map(mapRowToCamp);
            for (const camp of all_camps) {
                await getActivityIds(camp);
            }
            return all_camps;

        } else {
            return [];
        }

    } catch (err){
        throw new Error(err);
    }
}

/**
 * Creates a new camp record in the database.
 * @async
 * @function createCamp
 * @param {string} name - The name of the camp object to be created in the database.
 * @param {string} campus_id - The id of the campus to store the camp object to be created in the database.
 * @returns {boolean} - Whether operation succeeded or not
 */
async function createCamp(name, campus_id) {
    const camp_id = uuid.v1()
    const query = `INSERT INTO Camp(camp_id, name, campus_id) VALUES('${camp_id}', '${name}', '${campus_id}');`;

    try {
        await client.query(query);
        return true;
    } catch (err){
        throw new Error(err);
    }
}

module.exports = {
    getCampById,
    getAllCamps,
    createCamp
}