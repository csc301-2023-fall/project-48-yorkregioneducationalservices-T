/**
 * This module implements the DB operations for the campus service.
 * 
 * @module api/db/blockDbPlugin
 * 
 * @requires api/entities/Block
 * @requires api/db/db
 */

const Campus = require("../entities/Campus");
const { client } = require('./db');

/**
 * Maps a row from the campus table to a Campus object.
 * @param {Object} row - The row from the campus table.
 * @returns {Campus} A new Campus object.
 */
function mapRowToCampus(row) {
    return new Campus(
        row.campus_id.toString(),
        row.name,
        new Set(),
        new Set()
    );
}

/**
 * Retrieves a campus from the database by their ID.
 *
 * @param {number} campus_id - The ID of the campus to retrieve.
 * @returns {Campus} The retrieved campus object.
 */
async function getCampusById(campus_id) {

    var name;
    var camp_ids = new Set();
    var room_ids = new Set();

    try {
        return await new Promise((resolve, reject) => {
            client.query(`Select * from Campus where campus_id = '${campus_id}';`, (err, result)=>{
                
                if (!(result && result.rowCount > 0)) {
                    resolve(null);
                };
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
    } catch(err) {
        throw new Error(err);
    }
}

/**
 * Retrieves camp ids from the database and adds them to the set of camp ids for a given campus.
 * 
 * @param {Object} campus - The campus object for which to retrieve and store camp ids.
 * @param {number} campus.campus_id - The ID of the campus for which to retrieve and store camp ids.
 * @returns the updated campus object if successful
 */
async function getCampIds(campus) {  
    const query = `Select camp_id from Camp where campus_id = $1;`;  

    const values = [campus.campus_id];
    try {
        const result = await client.query(query, values);
 
        promises = result.rows.map(async (row) => {
            campus.camp_ids.add(row.camp_id.toString());
        });

        await Promise.all(promises);
        return campus;

    } catch (err) {
        throw new Error(err);
    }

  }

/**
 * Retrieves room ids from the database and adds them to the set of room ids for a given campus.
 * 
 * @param {Object} campus - The campus object for which to retrieve and store room ids.
 * @param {number} campus.campus_id - The ID of the campus for which to retrieve and store room ids.
 * @returns the updated campus object if successful
 */
  async function getRoomIds(campus) {  
      const queryGetRoomIds = `Select room_id from Room where campus_id = $1;`;  
  
      const values = [campus.campus_id];
      try {
          const result = await client.query(queryGetRoomIds, values);
   
          promises = result.rows.map(async (row) => {
              campus.room_ids.add(row.room_id.toString());
          });
  
          await Promise.all(promises);
          return campus;
  
      } catch (err) {
          throw new Error(err);
      }
  
    }

/**
 * Retrieves all campuses from the database and maps them to Campus objects.
 * 
 * @returns {Array<Campus>} An array of Campus objects.
 */
async function getAllCampuses() {

    var all_campuses;
    try {
        return await new Promise(async (resolve, reject) => {
            const result = await client.query(`SELECT * FROM Campus;`);
    
            const rows = result.rows;
    
            all_campuses = rows.map(mapRowToCampus);
    
            for (const campus of all_campuses) {
                await getCampIds(campus);
                await getRoomIds(campus);
            }
    
            resolve(all_campuses);
        });
    } catch(err) {
        throw new Error(err);
    }
    
}

/**
 * Creates a new campus record in the database.
 * 
 * @param {string} name - The name of the campus object to be created in the database.
 * @returns {boolean} - Whether the campus was created successfully.
 */
async function createCampus(name) {
    
    try {
        return await new Promise((resolve, reject) => {
            client.query(`INSERT INTO Campus(name) VALUES('${name}');`, function (err, result) {
                if (err){
                    reject(err);
                }
            });
            
            resolve(true);
        });
    } catch(err) {
        throw new Error(err);
    }
}

module.exports = {
    getCampusById,
    getAllCampuses,
    createCampus
}