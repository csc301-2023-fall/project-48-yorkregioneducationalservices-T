const Activity = require("../entities/Activity");
const Camp = require("../entities/Camp");
const Group = require("../entities/Group");
const Block = require("../entities/Block");
const Room = require("../entities/Room");
const AdminUser = require("../entities/AdminUser");

const { client } = require('./db');

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

async function getAllCampuses() {
    var all_campuses = new Array();

    return new Promise((resolve, reject) => {
        client.query(`SELECT * FROM Campus;`, function (err, result) {
            if (err) {
                reject(err);
            }
            var campus_id, name, camp_ids, room_ids;
            for (var i=0; i<result.length; i++) {
                campus_id = result[i].campus_id;
                name = result[i].name;
                camp_ids = new Set();
                room_ids = new Set();

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

                all_campuses.push(new Campus(campus_id, name, camp_ids, room_ids));
            }
        });
        resolve(all_campuses);
    });
}

async function createCampus(campus_id, name) {
    return new Promise((resolve, reject) => {
        client.query(`INSERT INTO Campus(campus_id, name) VALUES('${campus_id}', '${name}');`, function (err, result) {
            if (err){
                reject(err);
            }
        });
        
        resolve(new Campus(campus_id, name, new Set(), new Set()));
    });
}


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

async function getCampsByCampusId(campus_id) {
    var all_camps = new Array();

    return new Promise((resolve, reject) => {
        client.query(`SELECT * FROM Camp WHERE campus_id = '${campus_id}';`, function (err, result) {
            if (err) {
                reject(err);
            }
            var camp_id, name, activity_ids;
            for (var i=0; i<result.length; i++) {
                camp_id = result[i].camp_id;
                name = result[i].name;
                activity_ids = new Set();

                client.query(`Select activity_id from Activity where camp_id = '${camp_id}';`, (err, result)=>{
                    for (var i=0; i  < result.length; i++) {
                        activity_ids.add(result.rows[i].activity_id);
                    }
                });

                all_camps.push(new Camp(camp_id, name, activity_ids, campus_id));
            }
        });
        resolve(all_camps);
    });
}

async function createCamp(camp_id, name, campus_id) {
    return new Promise((resolve, reject) => {
        client.query(`INSERT INTO Camp(camp_id, name, campus_id) VALUES('${camp_id}', '${name}', '${campus_id}');`, function (err, result) {
            if (err){
                reject(err);
            }
        });
        resolve(new Camp(camp_id, name, new Set(), campus_id));
    });
}

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

async function getGroupsByCampusId(campus_id) {
    var all_groups = new Array();
    return new Promise((resolve, reject) => {
        client.query(
        `SELECT * 
        FROM CampGroup 
        WHERE EXISTS (
            SELECT *
            FROM Camp
            WHERE CampGroup.camp_id = Camp.camp_id AND Camp.campus_id = '${campus_id}'
            );`, function (err, result) {
            if (err) {
                reject(err);
            }
            var group_id, schedule_id, student_ids, counselor_ids, camp_id;
            for (var i=0; i<result.length; i++) {
                group_id = result[i].group_id;
                schedule_id = result[i].schedule_id;
                student_ids = new Set();
                counselor_ids = new Set();
                camp_id = result[i].camp_id;

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

                all_groups.push(new Group(group_id, schedule_id, student_ids, counselor_ids, camp_id));
            }
        });
        resolve(all_groups);
    });
}

async function createGroup(group_id, camp_id) {
    return new Promise((resolve, reject) => {
        client.query(`INSERT INTO CampGroup(camp_group_id, camp_id) VALUES('${group_id}', '${camp_id}');`, function (err, result) {
            if (err){
                reject(err);
            }
        });
        resolve(new Group(group_id, null, new Set(), new Set(), camp_id));
    });
}

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

async function getAllBlocks() {
    var all_blocks = new Array();
    return new Promise((resolve, reject) => {
        client.query(`SELECT * FROM Block;`, function (err, result) {
            if (err) {
                reject(err);
            }

            var block_id;
            var schedule_id;
            var room_id;
            var activity_id;
            var start_time;
            var end_time;

            for (var i=0; i<result.length; i++) {
                block_id = result.rows[i].block_id;
                schedule_id = result.rows[i].schedule_id;
                room_id = result.rows[i].room_id;
                activity_id = result.rows[i].activity_id;

                // Set date to be January 1, 2023 (arbitrary, only need to keep track of hours and minutes.)
                start_hours = result.rows[i].start_time.slice(0, 2);
                start_minutes = result.rows[i].start_time.slice(3, 5);
                start_time = new Date(2023, 1, 1, parseInt(start_hours), parseInt(start_minutes));

                end_hours = result.rows[i].end_time.slice(0, 2);
                end_minutes = result.rows[i].end_time.slice(3, 5);
                end_time = new Date(2023, 1, 1, parseInt(end_hours), parseInt(end_minutes));

                all_blocks.push(new Block(block_id, schedule_id, room_id, activity_id, start_time, end_time));
            }
        });
        resolve(all_blocks);
    });
}

async function createBlock(block_id, schedule_id, room_id, activity_id, start_time, end_time) {
    start_hours = start_time.getHours();
    start_minutes = start_time.getMinutes();
    var start;
    if (start_minutes < 10) {
        start = start_hours + ":0" + start_minutes;
    } else {
        start = start_hours + ":" + start_minutes;
    }

    end_hours = end_time.getHours();
    end_minutes = end_time.getMinutes();
    var end;
    if (end_minutes < 10) {
        end = end_hours + ":0" + end_minutes;
    } else {
        end = end_hours + ":" + end_minutes;
    }
    return new Promise((resolve, reject) => {
        client.query(`INSERT INTO Block(block_id, room_id, activity_id, start_time, end_time, schedule_id) VALUES('${block_id}', '${room_id}', '${activity_id}', '${start}', '${end}', '${schedule_id}');`, function (err, result) {
            if (err){
                reject(err);
            }
        });
        resolve(new Block(block_id, schedule_id, room_id, activity_id, start_time, end_time));
    });
}

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

function getCampActivities(camp_id) {
    // For testing error handling of non-existant camp
    if (camp_id != "f307479d-262e-423a-a681-a043c2577b0b") {
        throw Error("camp_id does not exist");
    }
    return [
        new Activity(camp_id,
                    '516f96ad-e78e-44da-8504-133dc01e8a38',
                    'Activity #1',
                    1),
        new Activity(camp_id,
                    '03fce57a-1e83-4c5b-ae04-0cbe32c9c164',
                    'Activity #2',
                    1),
        new Activity(camp_id,
                    'fd764e44-1aa7-431b-a06a-14786e99838d',
                    'Activity #3',
                    2),
        new Activity(camp_id,
                    '1efb3732-4ae0-4a6d-b1dd-a2fd9cd38a69',
                    'Activity #4',
                    2),
        new Activity(camp_id,
                    'b8a2a34b-e8e8-450b-a8e5-f44968d774b6',
                    'Activity #5',
                    3),
        new Activity(camp_id,
                    'a083e4bd-4b91-4fee-8708-dcd3e45fd8d6',
                    'Activity #6',
                    1),
    ];
}

function submitSchedule(schedule) {
    return true;
}

////////////////////////////////////////////////////////////////////////////////////
/** Object getter for Room class.
 * 
 * @param {string} room_id - room UUID.
 * @returns an object of type Room with given room ID, or undefined if not exists.
 */
function getRoomById(room_id) {
    var name, campus_id;
    client.query(`SELECT * FROM yres_db.Room WHERE room_id = '${room_id}';`, function (err, result) {
        if (result.length == 0) {
            return undefined;
        }
        if (err){
            throw Error(err);
        }
        name = result.rows[0].name;
        campus_id = result.rows[0].campus_id;
    });
    return new Room(
        room_id,
        name,
        campus_id);
}

/** Get a list of all Room objects of a given campus.
 * 
 *  @param {string} campus_id - ID of the campus from which to get all rooms.
 *  @returns an array of Room objects with the given campus_id. Empty array is returned if the campus_id does not exist.
 */
function getRoomsByCampusId(campus_id) {
    var all_rooms = new Array();
    client.query(`SELECT * FROM yres_db.Room WHERE campus_id = '${campus_id}';`, function (err, result) {
        if (err) {
            throw Error(err);
        }
        var room_id, name;
        for (var i=0; i<result.length; i++) {
            room_id = result[i].room_id;
            name = result[i].name;
            all_rooms.push(new Room(room_id, name, campus_id));
        }
    });
    return all_rooms;
}

/** Write a Room to database.
 * 
 * @param {string} room_id - room UUID.
 * @param {string} name - room name.
 * @param {string} campus_id - ID of campus this room belongs to.
 * @returns true if written successfully.
 */
function createRoom(room_id, name, campus_id) {
    client.query(`INSERT INTO yres_db.Room(room_id, name, campus_id) VALUES('${room_id, name, campus_id}')`, function (err, result) {
        if (err){
            throw Error(err);
            return false;
        }
    });
    return true;
}

/** Object getter for Admin User class.
 * 
 * @param {string} room_id - room UUID.
 * @returns an object of type Room with given room ID, or undefined if not exists.
 */
function getAdminUserByName(username) {
    var password;
    client.query(`SELECT * FROM yres_db.LoginInfo WHERE username = '${username}';`, function (err, result) {
        if (result.length == 0) {
            return undefined;
        }
        password = result.rows[0].password;
        if (err){
            throw Error(err);
        }
    });
    return new AdminUser(
        username,
        password);
}

/** Write an administrator to the database.
 * 
 * @param {string} username - Must not exist already in the DB.
 * @param {string} password 
 * @returns true if written successfully.
 */
function createAdminUser(username, password) {
    var existing_user = getAdminUserByName(username);
    if (existing_user != undefined)
        return false;
    client.query(`INSERT INTO yres_db.LoginInfo(username, password) VALUES('${username, password}')`, function (err, result) {
        if (err){
            throw Error(err);
            return false;
        }
    });
    return true;
}

/** Check if a pair of username and password is valid.
 * 
 * @param {string} username 
 * @param {string} password 
 * @returns true if the combination is valid.
 */
function checkLogin(username, password) {
    var admin = getAdminUserByName(username);
    if (admin == undefined)
        return false;
    if (password == admin.password)
        return true;
    return false;
}

/** Check if a user exists.
 * 
 * @param {string} username 
 * @returns true if the user exists.
 */
function existsUser(username) {
    var admin = getAdminUserByName(username);
    if (admin == undefined)
        return false;
    return true;
}




module.exports = {
    getCampusById,
    getAllCampuses,
    createCampus,
    getCampById,
    getCampsByCampusId,
    createCamp,
    getGroupById,
    getGroupsByCampusId,
    createGroup,
    deleteAllGroups,
    getBlockById,
    getAllBlocks,
    createBlock,
    deleteAllBlocks,
    getCampActivities,
    submitSchedule,
    checkLogin,
    existsUser,

   
    createAdminUser,
    getAdminUserByName,
    createRoom,
    getRoomsByCampusId,
    getRoomById
}