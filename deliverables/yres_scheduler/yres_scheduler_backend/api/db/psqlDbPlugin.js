const Activity = require("../entities/Activity");
const Camp = require("../entities/Camp");
const Room = require("../entities/Room");
const AdminUser = require("../entities/AdminUser");

const { client, connectDB } = require('./db');
connectDB();

function getCampusById(campus_id) {

    var name;
    var camp_ids = new Set();
    var room_ids = new Set();

    client.query(`Select * from yres_db.Campus where campus_id = '${campus_id}';`, (err, result)=>{

        name = result.rows[0].name;

        if (err){
            throw Error(err);
        }
    });

    client.query(`Select camp_id from yres_db.Camp where campus_id = '${campus_id}';`, (err, result)=>{
        for (var i=0; i  < result.length; i++) {
            camp_ids.add(result.rows[i].camp_id);
        }
    });

    client.query(`Select room_id from yres_db.Room where campus_id = '${campus_id}';`, (err, result)=>{
        for (var i=0; i  < result.length; i++) {
            room_ids.add(result.rows[i].room_id);
        }
    });

    return new Campus(campus_id, name, camp_ids, room_ids);

}

function getAllCampuses() {
    var all_campuses = new Array();
    client.query(`SELECT * FROM yres_db.Campus;`, function (err, result) {
        if (err) {
            throw Error(err);
        }
        var campus_id, name, camp_ids, room_ids;
        for (var i=0; i<result.length; i++) {
            campus_id = result[i].campus_id;
            name = result[i].name;
            camp_ids = new Set();
            room_ids = new Set();

            client.query(`Select camp_id from yres_db.Camp where campus_id = '${campus_id}';`, (err, result)=>{
                for (var i=0; i  < result.length; i++) {
                    camp_ids.add(result.rows[i].camp_id);
                }
            });

            client.query(`Select room_id from yres_db.Room where campus_id = '${campus_id}';`, (err, result)=>{
                for (var i=0; i  < result.length; i++) {
                    room_ids.add(result.rows[i].room_id);
                }
            });

            all_campuses.push(new Campus(campus_id, name, camp_ids, room_ids));
        }
    });
    return all_campuses;
}

function getCampById(camp_id) {

    var name;
    var activity_ids = new Set();
    var campus_id;

    client.query(`Select * from yres_db.Camp where camp_id = '${camp_id}';`, (err, result)=>{

        campus_id = result.rows[0].campus_id;
        name = result.rows[0].name;

        if (err){
            throw Error(err);
        }
    });

    client.query(`Select activity_id from yres_db.Activity where camp_id = '${camp_id}';`, (err, result)=>{
        for (var i=0; i  < result.length; i++) {
            activity_ids.add(result.rows[i].activity_id);
        }
    });

    return new Camp(camp_id, name, activity_ids, campus_id);

}

function getCampsByCampusId(campus_id) {
    var all_camps = new Array();
    client.query(`SELECT * FROM yres_db.Camp WHERE campus_id = '${campus_id}';`, function (err, result) {
        if (err) {
            throw Error(err);
        }
        var camp_id, name, activity_ids;
        for (var i=0; i<result.length; i++) {
            camp_id = result[i].camp_id;
            name = result[i].name;
            activity_ids = new Set();

            client.query(`Select activity_id from yres_db.Activity where camp_id = '${camp_id}';`, (err, result)=>{
                for (var i=0; i  < result.length; i++) {
                    activity_ids.add(result.rows[i].activity_id);
                }
            });

            all_camps.push(new Camp(camp_id, name, activity_ids, campus_id));
        }
    });
    return all_camps;
}

function getGroupById(group_id) {

    var schedule_id;
    var student_ids = new Set();
    var counselor_ids = new Set();
    var camp_id;

    client.query(`Select * from yres_db.CampGroup where camp_group_id = '${group_id}';`, (err, result)=>{

        schedule_id = result.rows[0].schedule_id;
        camp_id = result.rows[0].camp_id;

        if (err){
            throw Error(err);
        }
    });

    client.query(`Select student_id from yres_db.Student where camp_group_id = '${group_id}';`, (err, result)=>{
        for (var i=0; i  < result.length; i++) {
            student_ids.add(result.rows[i].student_id);
        }
    });

    client.query(`Select counselor_id from yres_db.Counselor where camp_group_id = '${group_id}';`, (err, result)=>{
        for (var i=0; i  < result.length; i++) {
            counselor_ids.add(result.rows[i].counselor_id);
        }
    });

    return new Group(group_id, schedule_id, student_ids, counselor_ids, camp_id);

}

function getGroupsByCampId(camp_id) {
    var all_groups = new Array();
    client.query(`SELECT * FROM yres_db.Group WHERE camp_id = '${camp_id}';`, function (err, result) {
        if (err) {
            throw Error(err);
        }
        var group_id, schedule_id, student_ids, counselor_ids;
        for (var i=0; i<result.length; i++) {
            group_id = result[i].group_id;
            schedule_id = result[i].schedule_id;
            student_ids = new Set();
            counselor_ids = new Set();

            client.query(`Select student_id from yres_db.Student where camp_group_id = '${group_id}';`, (err, result)=>{
                for (var i=0; i  < result.length; i++) {
                    student_ids.add(result.rows[i].student_id);
                }
            });

            client.query(`Select counselor_id from yres_db.Counselor where camp_group_id = '${group_id}';`, (err, result)=>{
                for (var i=0; i  < result.length; i++) {
                    counselor_ids.add(result.rows[i].counselor_id);
                }
            });

            all_groups.push(new Group(group_id, schedule_id, student_ids, counselor_ids, camp_id));
        }
    });
    return all_groups;
}

function getCampById(camp_id) {

    var name;
    var activity_ids = new Set();
    var campus_id;

    client.query(`Select * from yres_db.Camp where camp_id = '${camp_id}';`, (err, result)=>{
        
        campus_id = result.rows[0].campus_id;
        name = result.rows[0].name;

        if (err){
            throw Error(err);
        }
    });

    client.query(`Select activity_id from yres_db.Activity where camp_id = '${camp_id}';`, (err, result)=>{
        for (var i=0; i  < result.length; i++) {
            activity_ids.add(result.rows[i].activity_id);
        }
    });

    return new Camp(
        camp_id,
        name,
        activity_ids,
        campus_id);
    
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

function getCampById(camp_id) {
    // For testing error handling of non-existant camp
    if (camp_id != "f307479d-262e-423a-a681-a043c2577b0b") {
        throw Error("camp_id does not exist");
    }
    return new Camp(1, camp_id);
}

////////////////////////////////////////////////////////////////////////////////////
/** Object getter for Room class.
 * 
 * @param {string} room_id - room UUID.
 * @returns an object of type Room with given room ID, or null if not exists.
 */
function getRoomById(room_id) {
    var name, campus_id;
    client.query(`SELECT * FROM yres_db.Room WHERE room_id = '${room_id}';`, function (err, result) {
        if (result.length == 0) {
            return null;
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
 * @returns an object of type Room with given room ID, or null if not exists.
 */
async function getAdminUserByName(username) {
    var password;
    const query = `SELECT * FROM logininfo WHERE username = '${username}';`
    try {
        const result = await client.query(query);

        if (result && result.rowCount > 0) {
            password = result.rows[0].password;
            return new AdminUser(
                username,
                password);
        } else {

            return null;
        }

    } catch (err){
        throw new Error(err);
    }
        
}

/** Write an administrator to the database.
 * 
 * @param {string} username - Must not exist already in the DB.
 * @param {string} password 
 * @returns true if written successfully.
 */
async function createAdminUser(username, password) {
    const query = `INSERT INTO logininfo(username, password) VALUES('${username}', '${password}');`
    try {
        const result = await client.query(query);

        return true;

    } catch (err){
        throw new Error(err);
    }
}

/** Check if a pair of username and password is valid.
 * 
 * @param {string} username 
 * @param {string} password 
 * @returns true if the combination is valid.
 */
async function checkLogin(username, password) {
    var admin = await getAdminUserByName(username);
    if (admin == null) {
        return false;
    }
    if (password == admin.password) {
        return true;
    }
    return false;
}

/** Check if a user exists.
 * 
 * @param {string} username 
 * @returns true if the user exists.
 */
async function existsUser(username) {
    var admin = await getAdminUserByName(username);
    if (admin == null)
        return false;
    return true;
}


module.exports = {
    getCampActivities,
    submitSchedule,
    getCampById,
    //////////////////////
    checkLogin,
    existsUser,

   
    createAdminUser,
    getAdminUserByName,
    createRoom,
    getRoomsByCampusId,
    getRoomById
    //////////////////////
}