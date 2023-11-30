/**
 * This module implements the DB operations for the schedule service.
 * 
 * @module api/db/scheduleDbPlugin
 * 
 * @requires api/entities/Schedule
 * @requires api/entities/Block
 * @requires api/db/db
 */

const Schedule = require("../entities/Schedule");
const Block = require("../entities/Block");
const { client } = require('./db');

/**
 * Maps a row from the Schedule table to a Schedule object.
 * @param {Object} row - The row from the Schedule table.
 * @returns {Schedule} A new Schedule object.
 */
function mapRowToSchedule(row) {
    var start_hours = row.start_time.slice(0, 2);
    var start_minutes = row.start_time.slice(3, 5);
    var start_time = new Date(2023, 1, 1, parseInt(start_hours), parseInt(start_minutes));

    var end_hours = row.end_time.slice(0, 2);
    var end_minutes = row.end_time.slice(3, 5);
    var end_time = new Date(2023, 1, 1, parseInt(end_hours), parseInt(end_minutes));
    
    return new Schedule(
        row.schedule_id,
        '',
        [],
        start_time,
        end_time
    );
}

/**
 * Retrieves the singular (or the last if there is an issue) group id from the database and sets it to the group id for a given Schedule.
 * 
 * @param {Object} schedule - The schedule object for which to retrieve and store the group id.
 * @param {number} schedule.schedule_id - The ID of the schedule for which to retrieve and store the group id.
 * @throws {Error} Throws an error if there was an issue fetching group ids from the database.
 */
async function getGroupId(schedule) {  
    const queryGetGroupId = `Select camp_group_id from CampGroup where schedule_id = $1;`;  

    const values = [schedule.schedule_id];
    try {
        const result = await client.query(queryGetGroupId, values);
 
        promises = result.rows.map(async (row) => { //Iterates, but there should only be 1 group.
            schedule.set_group_id(row.camp_group_id);
        });

        await Promise.all(promises);

    } catch (err) {
        throw new Error(err);
    }

  }

/**
 * Retrieves blocks from the database and adds them as Block objects to the set of blocks for a given schedule.
 * @async
 * @function getBlocks
 * @param {Object} schedule - The schedule object for which to retrieve and store blocks.
 * @param {number} schedule.schedule_id - The ID of the schedule for which to retrieve and store blocks.
 * @returns {Schedule} The updated schedule
 */
  async function getBlocks(schedule) {  
        //Blocks are added in random order (order given from sql query). Add ORDER BY in query (or something else) to sort
      const queryGetBlocks = `Select * from Block where schedule_id = $1 order by start_time;`;  
  
      const values = [schedule.schedule_id];
      try {
          const result = await client.query(queryGetBlocks, values);
   
            promises = result.rows.map(async (row) => {
            var block_id = row.block_id;
            var room_id = row.room_id;
            var activity_id = row.activity_id;

            var start_hours = row.start_time.slice(0, 2);
            var start_minutes = row.start_time.slice(3, 5);
            var start_time = new Date(2023, 1, 1, parseInt(start_hours), parseInt(start_minutes));
        
            var end_hours = row.end_time.slice(0, 2);
            var end_minutes = row.end_time.slice(3, 5);
            var end_time = new Date(2023, 1, 1, parseInt(end_hours), parseInt(end_minutes));

            schedule.add_given_block(new Block(block_id, schedule.schedule_id, room_id, activity_id, start_time, end_time));
          });
  
          await Promise.all(promises);
          return schedule;
  
      } catch (err) {
            throw new Error('Failed to fetch blocks');
      }
  
    }

/**
 * Retrieves all Schedules (should only be one) from the database and maps them to Schedule objects.
 * 
 * @returns {Array<Group>} An array of Schedule objects.
 */
async function getAllSchedules() {

    var all_schedules;
    try {
        const result = await client.query(`SELECT * FROM Schedule;`);

        const rows = result.rows;

        all_schedules = rows.map(mapRowToSchedule);

        for (const schedule of all_schedules) {
            await getGroupId(schedule);
            await getBlocks(schedule);
        }

        return all_schedules;
    } catch(err) {
        throw new Error(err);
    }
        
}

/**
 * Deletes all Schedules in the database.
 * @async
 * @function deleteAllSchedules
 * @returns {boolean} - Returns a boolean that is true if operation is successful
 */
async function deleteAllSchedules() {

    const query = `DELETE FROM Schedule;`;
    try {
        await client.query(query);
        return true;
    } catch (err){
        throw new Error(err);
    }
}

/**
 * Reset Schedule ID counter in the database.
 * @async
 * @function resetScheduleIds
 * @returns {boolean} - Returns a boolean that is true if operation is successful
 */
async function resetScheduleIds() {

    const query = `ALTER SEQUENCE schedule_schedule_id_seq RESTART WITH 1;`;
    try {
        await client.query(query);
        return true;
    } catch (err){
        throw new Error(err);
    }
}

module.exports = {
    getAllSchedules,
    deleteAllSchedules,
    resetScheduleIds
}
