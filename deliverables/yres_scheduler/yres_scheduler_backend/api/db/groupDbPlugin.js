const Group = require("../entities/Group");
const uuid = require('uuid');
const { client } = require('./db');

/**
 * Maps a row from the CampGroup table to a Group object.
 * @param {Object} row - The row from the CampGroup table.
 * @returns {Group} A new Group object.
 */
function mapRowToGroup(row) {
    return new Group(
        row.camp_group_id,
        row.schedule_id,
        new Set(),
        new Set(),
        row.camp_id
    );
}

/**
 * Retrieves a group from the database by their ID.
 *
 * @param {string} group_id - The ID of the group to retrieve.
 * @returns {Promise<Group>} A Promise that resolves with the retrieved group object.
 * @throws {Error} If there was an error retrieving the group from the database.
 */
async function getGroupById(group_id) {

    var schedule_id;
    var student_ids = new Set();
    var counselor_ids = new Set();
    var camp_id;

    return new Promise((resolve, reject) => {
        client.query(`Select * from CampGroup where camp_group_id = '${group_id}';`, (err, result)=>{

            schedule_id = result.rows[0].schedule_id;
            camp_id = result.rows[0].camp_id;

            if (err){
                reject(err);
            }
        });

        client.query(`Select student_id from Student where camp_group_id = '${group_id}';`, (err, result)=>{
            for (var i=0; i  < result.length; i++) {
                student_ids.add(result.rows[i].student_id);
            }
        });

        client.query(`Select counselor_id from Counselor where camp_group_id = '${group_id}';`, (err, result)=>{
            for (var i=0; i  < result.length; i++) {
                counselor_ids.add(result.rows[i].counselor_id);
            }
        });

        resolve(new Group(group_id, schedule_id, student_ids, counselor_ids, camp_id));
    });
}

/**
 * Retrieves student ids from the database and adds them to the set of student ids for a given group.
 * @async
 * @function getStudentIds
 * @param {Object} group - The group object for which to retrieve and store student ids.
 * @param {string} group.group_id - The ID of the group for which to retrieve and store student ids.
 * @throws {Error} Throws an error if there was an issue fetching student ids from the database.
 */
async function getStudentIds(group) {  
    const queryGetStudentIds = `Select student_id from Student where camp_group_id = $1;`;  

    const values = [group.group_id];
    try {
        const result = await client.query(queryGetStudentIds, values);
 
        promises = result.rows.map(async (row) => {
            group.student_ids.add(row.student_id);
        });

        await Promise.all(promises);

    } catch (error) {
        // Handle errors appropriately
        console.error('Error while fetching student ids:', error);
        throw new Error('Failed to fetch student ids');
    }

  }

/**
 * Retrieves counselor ids from the database and adds them to the set of counselor ids for a given group.
 * @async
 * @function getCounselorIds
 * @param {Object} group - The group object for which to retrieve and store counselor ids.
 * @param {string} group.group_id - The ID of the group for which to retrieve and store counselor ids.
 * @throws {Error} Throws an error if there was an issue fetching counselor ids from the database.
 */
  async function getCounselorIds(group) {  
      const queryGetCounselorIds = `Select counselor_id from Counselor where camp_group_id = $1;`;  
  
      const values = [group.group_id];
      try {
          const result = await client.query(queryGetCounselorIds, values);
   
          promises = result.rows.map(async (row) => {
              group.counselor_ids.add(row.counselor_id);
          });
  
          await Promise.all(promises);
  
      } catch (error) {
          // Handle errors appropriately
          console.error('Error while fetching counselor ids:', error);
          throw new Error('Failed to fetch counselor ids');
      }
  
    }

/**
 * Retrieves all CampGroups from the database and maps them to Group objects.
 * 
 * @returns {Promise<Array<Group>>} A promise that resolves with an array of Group objects.
 */
/* OLD QUERY IN CASE WE DO GET BY CAMPUS ID AGAIN
`SELECT * 
            FROM CampGroup 
            WHERE EXISTS (
                SELECT *
                FROM Camp
                WHERE CampGroup.camp_id = Camp.camp_id AND Camp.campus_id = '${campus_id}'
                );`
*/
async function getAllGroups() {

    var all_groups;
    return new Promise(async (resolve, reject) => {
        const result = await new Promise((queryResolve, queryReject) => {
            client.query(`SELECT * FROM CampGroup;`, function (err, result) {
                if (err) {
                    queryReject(err);
                } else {
                    queryResolve(result);
                }
            });
        });

        const rows = result.rows;

        all_groups = rows.map(mapRowToGroup);

        for (const group of all_groups) {
            await getStudentIds(group);
            await getCounselorIds(group);
        }

        resolve(all_groups);
    });
}

/**
 * Creates a new group record in the database.
 * @async
 * @function createGroup
 * @param {string} camp_id - The id of the camp in which to create the group object in the database.
 * @returns {Promise<boolean>} - A promise that resolves to true if the group was created successfully.
 */
async function createGroup(camp_id) {
    group_id = uuid.v1();

    return new Promise((resolve, reject) => {
        client.query(`INSERT INTO CampGroup(camp_group_id, camp_id) VALUES('${group_id}', '${camp_id}');`, function (err, result) {
            if (err){
                reject(err);
            }
        });

        resolve(true);
    });
}

/**
 * Deletes all CampGroups in the database.
 * @async
 * @function deleteAllGroups
 * @returns {Promise<boolean>} - Returns a Promise that resolves to true if the deletion succeeded.
 */
async function deleteAllGroups() {
    return new Promise((resolve, reject) => {
        client.query(`DELETE FROM CampGroup;`, function (err, result) {
            if (err){
                reject(err);
            }
        });
        resolve(true);
    });
}


module.exports = {
    getGroupById,
    getAllGroups,
    createGroup,
    deleteAllGroups
}