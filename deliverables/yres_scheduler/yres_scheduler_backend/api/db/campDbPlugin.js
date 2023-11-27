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
 * @param {number} camp_id - The ID of the camp to retrieve.
 * @returns {Promise<Camp>} A Promise that resolves with the retrieved camp object.
 * @throws {Error} If there was an error retrieving the camp from the database.
 */
async function getCampById(camp_id) {

    var name;
    var activity_ids = new Set();
    var campus_id;

    return new Promise((resolve, reject) => {
        client.query(`Select * from Camp where camp_id = '${camp_id}';`, (err, result)=>{

            campus_id = result.rows[0].campus_id;
            name = result.rows[0].name;

            if (err){
                reject(err);
            }
        });

        client.query(`Select activity_id from Activity where camp_id = '${camp_id}';`, (err, result)=>{
            for (var i=0; i  < result.length; i++) {
                activity_ids.add(result.rows[i].activity_id);
            }
        });

        resolve(new Camp(camp_id, name, activity_ids, campus_id));
    });
}

/**
 * Retrieves activity ids from the database and adds them to the set of activity ids for a given camp.
 * @async
 * @function getActivityIds
 * @param {Object} camp - The camp object for which to retrieve and store activity ids.
 * @param {number} camp.camp_id - The ID of the camp for which to retrieve and store activity ids.
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
    return new Promise(async (resolve, reject) => {
        const result = await new Promise((queryResolve, queryReject) => {
            client.query(`SELECT * FROM Camp;`, function (err, result) {
                if (err) {
                    queryReject(err);
                } else {
                    queryResolve(result);
                }
            });
        });

        const rows = result.rows;

        all_camps = rows.map(mapRowToCamp);

        for (const camp of all_camps) {
            await getActivityIds(camp);
        }        
        
        resolve(all_camps);
    });
}

/**
 * Creates a new camp record in the database.
 * @async
 * @function createCamp
 * @param {string} name - The name of the camp object to be created in the database.
 * @param {number} campus_id - The id of the campus to store the camp object to be created in the database.
 * @returns {Promise<boolean>} - A promise that resolves to true if the camp was created successfully.
 */
async function createCamp(name, campus_id) {
    //camp_id = uuid.v1()

    return new Promise((resolve, reject) => {
        client.query(`INSERT INTO Camp(name, campus_id) VALUES('${name}', '${campus_id}');`, function (err, result) {
            if (err){
                reject(err);
            }
        });
        resolve(true);
    });
}

module.exports = {
    getCampById,
    getAllCamps,
    createCamp
}