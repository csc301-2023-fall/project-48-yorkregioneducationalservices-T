const Campus = require("../entities/Campus");
const uuid = require('uuid');
const { client } = require('./db');

/**
 * Maps a row from the campus table to a Campus object.
 * @param {Object} row - The row from the campus table.
 * @returns {Campus} A new Campus object.
 */
function mapRowToCampus(row) {
    return new Campus(
        row.campus_id,
        row.name,
        new Set(),
        new Set()
    );
}

/**
 * Retrieves a campus from the database by their ID.
 *
 * @param {string} campus_id - The ID of the campus to retrieve.
 * @returns {Promise<Campus>} A Promise that resolves with the retrieved campus object.
 * @throws {Error} If there was an error retrieving the campus from the database.
 */
async function getCampusById(campus_id) {

    var name;
    var camp_ids = new Set();
    var room_ids = new Set();

    return new Promise((resolve, reject) => {
        client.query(`Select * from Campus where campus_id = '${campus_id}';`, (err, result)=>{

            name = result.rows[0].name;
    
            if (err){
                reject(err);
            }
        });
    
        client.query(`Select camp_id from Camp where campus_id = '${campus_id}';`, (err, result)=>{
            for (var i=0; i  < result.length; i++) {
                camp_ids.add(result.rows[i].camp_id);
            }
        });
    
        client.query(`Select room_id from Room where campus_id = '${campus_id}';`, (err, result)=>{
            for (var i=0; i  < result.length; i++) {
                room_ids.add(result.rows[i].room_id);
            }
        });

        resolve(new Campus(campus_id, name, camp_ids, room_ids));
    });
}

/**
 * Retrieves camp ids from the database and adds them to the set of camp ids for a given campus.
 * @async
 * @function getCampIds
 * @param {Object} campus - The campus object for which to retrieve and store camp ids.
 * @param {string} campus.campus_id - The ID of the campus for which to retrieve and store camp ids.
 * @throws {Error} Throws an error if there was an issue fetching camp ids from the database.
 */
async function getCampIds(campus) {  
    const queryGetCampIds = `Select camp_id from Camp where campus_id = $1;`;  

    const values = [campus.campus_id];
    try {
        const result = await client.query(queryGetCampIds, values);
 
        promises = result.rows.map(async (row) => {
            campus.camp_ids.add(row.camp_id);
        });

        await Promise.all(promises);

    } catch (error) {
        // Handle errors appropriately
        console.error('Error while fetching camp ids:', error);
        throw new Error('Failed to fetch camp ids');
    }

  }

/**
 * Retrieves room ids from the database and adds them to the set of room ids for a given campus.
 * @async
 * @function getRoomIds
 * @param {Object} campus - The campus object for which to retrieve and store room ids.
 * @param {string} campus.campus_id - The ID of the campus for which to retrieve and store room ids.
 * @throws {Error} Throws an error if there was an issue fetching room ids from the database.
 */
  async function getRoomIds(campus) {  
      const queryGetRoomIds = `Select room_id from Room where campus_id = $1;`;  
  
      const values = [campus.campus_id];
      try {
          const result = await client.query(queryGetRoomIds, values);
   
          promises = result.rows.map(async (row) => {
              campus.room_ids.add(row.room_id);
          });
  
          await Promise.all(promises);
  
      } catch (error) {
          // Handle errors appropriately
          console.error('Error while fetching room ids:', error);
          throw new Error('Failed to fetch room ids');
      }
  
    }

/**
 * Retrieves all campuses from the database and maps them to Campus objects.
 * 
 * @returns {Promise<Array<Campus>>} A promise that resolves with an array of Campus objects.
 */
async function getAllCampuses() {

    var all_campuses;
    return new Promise(async (resolve, reject) => {
        const result = await new Promise((queryResolve, queryReject) => {
            client.query(`SELECT * FROM Campus;`, (err, result) => {
                if (err) {
                    queryReject(err);
                } else {
                    queryResolve(result);
                }
            });
        });

        const rows = result.rows;

        all_campuses = rows.map(mapRowToCampus);

        for (const campus of all_campuses) {
            await getCampIds(campus);
            await getRoomIds(campus);
        }

        resolve(all_campuses);
    });
}

/**
 * Creates a new campus record in the database.
 * @async
 * @function createCampus
 * @param {string} name - The name of the campus object to be created in the database.
 * @returns {Promise<boolean>} - A promise that resolves to true if the campus was created successfully.
 */
async function createCampus(name) {
    campus_id = uuid.v1();
    
    return new Promise((resolve, reject) => {
        client.query(`INSERT INTO Campus(campus_id, name) VALUES('${campus_id}', '${name}');`, function (err, result) {
            if (err){
                reject(err);
            }
        });
        
        resolve(true);
    });
}

module.exports = {
    getCampusById,
    getAllCampuses,
    createCampus
}