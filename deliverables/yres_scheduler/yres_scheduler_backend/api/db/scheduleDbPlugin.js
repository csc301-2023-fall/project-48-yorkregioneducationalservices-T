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
 * @async
 * @function getGroupId
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

    } catch (error) {
        // Handle errors appropriately
        console.error('Error while fetching group id:', error);
        throw new Error('Failed to fetch group ids');
    }

  }

/**
 * Retrieves blocks from the database and adds them as Block objects to the set of blocks for a given schedule.
 * @async
 * @function getBlocks
 * @param {Object} schedule - The schedule object for which to retrieve and store blocks.
 * @param {number} schedule.schedule_id - The ID of the schedule for which to retrieve and store blocks.
 * @throws {Error} Throws an error if there was an issue fetching blocks from the database.
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
  
      } catch (error) {
          // Handle errors appropriately
          console.error('Error while fetching blocks:', error);
          throw new Error('Failed to fetch blocks');
      }
  
    }

/**
 * Retrieves all Schedules (should only be one) from the database and maps them to Schedule objects.
 * 
 * @returns {Promise<Array<Group>>} A promise that resolves with an array of Schedule objects.
 */
async function getAllSchedules() {

    var all_schedules;
    return new Promise(async (resolve, reject) => {
        const result = await new Promise((queryResolve, queryReject) => {
            client.query(`SELECT * FROM Schedule;`, function (err, result) {
                if (err) {
                    queryReject(err);
                } else {
                    queryResolve(result);
                }
            });
        });

        const rows = result.rows;

        all_schedules = rows.map(mapRowToSchedule);

        for (const schedule of all_schedules) {
            await getGroupId(schedule);
            await getBlocks(schedule);
        }

        resolve(all_schedules);
    });
}

module.exports = {
    getAllSchedules
}
