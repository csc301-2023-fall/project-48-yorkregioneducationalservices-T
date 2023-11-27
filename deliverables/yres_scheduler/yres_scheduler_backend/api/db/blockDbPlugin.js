const Block = require("../entities/Block");
const uuid = require('uuid');
const { client } = require('./db');

/**
 * Maps a row from the Block table to a Block object.
 * @param {Object} row - The row from the Block table.
 * @returns {Block} A new Block object.
 */
function mapRowToBlock(row) {
    var start_hours = row.start_time.slice(0, 2);
    var start_minutes = row.start_time.slice(3, 5);
    var start_time = new Date(2023, 1, 1, parseInt(start_hours), parseInt(start_minutes));

    var end_hours = row.end_time.slice(0, 2);
    var end_minutes = row.end_time.slice(3, 5);
    var end_time = new Date(2023, 1, 1, parseInt(end_hours), parseInt(end_minutes));
    
    return new Block(
        row.block_id,
        row.schedule_id,
        row.room_id,
        row.activity_id,
        start_time,
        end_time
    );
}

/**
 * Retrieves a block from the database by their ID.
 *
 * @param {number} block_id - The ID of the block to retrieve.
 * @returns {Promise<Block>} A Promise that resolves with the retrieved block object.
 * @throws {Error} If there was an error retrieving the block from the database.
 */
async function getBlockById(block_id) {

    var schedule_id;
    var room_id;
    var activity_id;
    var start_time;
    var end_time;

    return new Promise((resolve, reject) => {
        client.query(`Select * from Block where block_id = '${block_id}';`, (err, result)=>{

            schedule_id = result.rows[0].schedule_id;
            room_id = result.rows[0].room_id;
            activity_id = result.rows[0].activity_id;

            // Set date to be January 1, 2023 (arbitrary, only need to keep track of hours and minutes.)
            start_hours = result.rows[0].start_time.slice(0, 2);
            start_minutes = result.rows[0].start_time.slice(3, 5);
            start_time = new Date(2023, 1, 1, parseInt(start_hours), parseInt(start_minutes));

            end_hours = result.rows[0].end_time.slice(0, 2);
            end_minutes = result.rows[0].end_time.slice(3, 5);
            end_time = new Date(2023, 1, 1, parseInt(end_hours), parseInt(end_minutes));

            if (err){
                reject(err);
            }
        });

        resolve(new Block(block_id, schedule_id, room_id, activity_id, start_time, end_time));
    });
}

/**
 * Retrieves all Blocks from the database and maps them to Block objects.
 * 
 * @returns {Promise<Array<Block>>} A promise that resolves with an array of Block objects.
 */
async function getAllBlocks() {

    var all_blocks;
    return new Promise(async (resolve, reject) => {
        const result = await new Promise((queryResolve, queryReject) => {
            client.query(`SELECT * FROM Block;`, function (err, result) {
                if (err) {
                    queryReject(err);
                } else {
                    queryResolve(result);
                }
            });
        });

        const rows = result.rows;

        all_blocks = rows.map(mapRowToBlock);

        resolve(all_blocks);
    });
}

/**
 * Creates a new block record in the database.
 * @async
 * @function createBlock
 * @param {number} schedule_id - The unique identifier of the schedule this block is in (can be null).
 * @param {number} room_id - The unique identifier of the room this block is held in.
 * @param {number} activity_id - The unique identifier of the activity this block is hosting.
 * @param {string} start_time - The start time of the block as a string (e.g.: '8:00', '12:00').
 * @param {string} end_time - The end time of the block as a string (e.g.: '8:00', '12:00').
 * @returns {Promise<boolean>} - A promise that resolves to true if the block was created successfully.
 */
async function createBlock(schedule_id, room_id, activity_id, start_time, end_time) {
    //block_id = uuid.v1();
    
    return new Promise((resolve, reject) => {
        if (schedule_id === undefined) {
            client.query(`INSERT INTO Block(room_id, activity_id, start_time, end_time) VALUES('${room_id}', '${activity_id}', '${start_time}', '${end_time}');`, function (err, result) {
                if (err){
                    reject(err);
                }
            });
            resolve(true);
        }
        client.query(`INSERT INTO Block(room_id, activity_id, start_time, end_time, schedule_id) VALUES('${room_id}', '${activity_id}', '${start_time}', '${end_time}', '${schedule_id}');`, function (err, result) {
            if (err){
                reject(err);
            }
        });
        resolve(true);
    });
}

/**
 * Deletes all Blocks in the database.
 * @async
 * @function deleteAllBlocks
 * @returns {Promise<boolean>} - Returns a Promise that resolves to true if the deletion succeeded.
 */
async function deleteAllBlocks() {
    return new Promise((resolve, reject) => {
        client.query(`DELETE FROM Block;`, function (err, result) {
            if (err) {
                reject(err);
            }
        });
        resolve(true);
    });
}

module.exports = {
    getBlockById,
    getAllBlocks,
    createBlock,
    deleteAllBlocks
}