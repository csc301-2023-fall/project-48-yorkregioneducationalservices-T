/**
 * This module implements DB operations for the group service.
 * 
 * @module api/db/groupDbPlugin
 * 
 * @requires api/entities/Group
 * @requires api/db/db
 */
const Group = require("../entities/Group");
const { client } = require('./db');

/**
 * Maps a row from the CampGroup table to a Group object.
 * @param {Object} row - The row from the CampGroup table.
 * @returns {Group} A new Group object.
 */
function mapRowToGroup(row) {
    return new Group(
        row.camp_group_id.toString(),
        row.schedule_id.toString(),
        new Set(),
        new Set(),
        row.camp_id.toString()
    );
}

/**
 * Retrieves a group from the database by their ID.
 *
 * @param {string} group_id - The ID of the group to retrieve.
 * @returns {Group} A retrieved group object
 */
async function getGroupById(group_id) {

    var schedule_id;
    var student_ids = new Set();
    var counselor_ids = new Set();
    var camp_id;

    try {
            var result = await client.query(`Select * from CampGroup where camp_group_id = '${group_id}';`);
                
            if (result && result.rowCount > 0) {
                schedule_id = result.rows[0].schedule_id;
                camp_id = result.rows[0].camp_id;
            } else {
                return null;
            }

            result = await client.query(`Select student_id from Student where camp_group_id = '${group_id}';`);

            for (var i=0; i  < result.length; i++) {
                student_ids.add(result.rows[i].student_id);
            }

            result = await client.query(`Select counselor_id from Counselor where camp_group_id = '${group_id}';`);
            for (var i=0; i  < result.length; i++) {
                counselor_ids.add(result.rows[i].counselor_id);
            }


            return new Group(group_id, schedule_id, student_ids, counselor_ids, camp_id);
    } catch(err) {
        throw new Error(err);
    }
}

/**
 * Retrieves student ids from the database and adds them to the set of student ids for a given group.
 * @async
 * @function getStudentIds
 * @param {Object} group - The group object for which to retrieve and store student ids.
 * @param {number} group.group_id - The ID of the group for which to retrieve and store student ids.
 * @returns true if operation is successful
 */
async function getStudentIds(group) {  
    const queryGetStudentIds = `Select student_id from Student where camp_group_id = $1;`;  

    const values = [group.group_id];
    try {
        const result = await client.query(queryGetStudentIds, values);
 
        promises = result.rows.map(async (row) => {
            group.student_ids.add(row.student_id.toString());
        });

        await Promise.all(promises);
        return true;

    } catch (err) {
        throw new Error(err);
    }

  }

/**
 * Retrieves counselor ids from the database and adds them to the set of counselor ids for a given group.
 * 
 * @param {Object} group - The group object for which to retrieve and store counselor ids.
 * @param {number} group.group_id - The ID of the group for which to retrieve and store counselor ids.
 * @returns true if operation is successful
 */
  async function getCounselorIds(group) {  
      const queryGetCounselorIds = `Select counselor_id from Counselor where camp_group_id = $1;`;  
  
      const values = [group.group_id];
      try {
          const result = await client.query(queryGetCounselorIds, values);
   
          promises = result.rows.map(async (row) => {
              group.counselor_ids.add(row.counselor_id.toString());
          });
  
          await Promise.all(promises);
          return true;
  
      } catch (err) {
          throw new Error(err);
      }
  
    }

/**
 * Retrieves all CampGroups from the database and maps them to Group objects.
 * 
 * @returns {Array<Group>} An array of Group objects.
 */
async function getAllGroups() {

    var all_groups;
    try {
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

        return all_groups;
    } catch(err) {
        throw new Error(err);
    }
}

/**
 * Creates a new group record in the database.
 * @async
 * @function createGroup
 * @param {number} camp_id - The id of the camp in which to create the group object in the database.
 * @returns {boolean} - true if the group was created successfully.
 */
async function createGroup(camp_id) {

    try {
        const result = await new Promise((resolve, reject) => {
            client.query(`INSERT INTO CampGroup(camp_id) VALUES('${camp_id}');`, function (err, result) {
                if (err){
                    reject(err);
                }
                resolve(true);
            });
        });
        return true;
    } catch (err) {
        throw new Error(err);
    }
}

/**
 * Deletes all CampGroups in the database.
 * 
 * @returns {boolean} - Returns a Promise that resolves to true if the deletion succeeded.
 */
async function deleteAllGroups() {
    try {
        await client.query(`DELETE FROM CampGroup;`);
        return true;
    } catch(err) {
        throw new Error(err);
    }
    
}

/**
 * Reset Group ID counter in the database.
 * @async
 * @function resetGroupIds
 * @returns {boolean} - Returns a boolean that is true if operation is successful
 */
async function resetGroupIds() {

    const query = `ALTER SEQUENCE campgroup_camp_group_id_seq RESTART WITH 1;`;
    try {
        await client.query(query);
        return true;
    } catch (err){
        throw new Error(err);
    }
}

module.exports = {
    getGroupById,
    getAllGroups,
    createGroup,
    deleteAllGroups,
    resetGroupIds
}