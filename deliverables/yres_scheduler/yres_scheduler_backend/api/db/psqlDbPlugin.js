const Activity = require("../entities/Activity");
const Campus = require("../entities/Campus");
const Camp = require("../entities/Camp");
const Group = require("../entities/Group");

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

/*
function getCampById(camp_id) {
    // For testing error handling of non-existant camp
    if (camp_id != "f307479d-262e-423a-a681-a043c2577b0b") {
        throw Error("camp_id does not exist");
    }
    return new Camp(1, camp_id);
}
*/

function checkLogin(username, password) {
    if (username == "UserName" && password == "123456")
        return true;
    return false;
}

function existsUser(username) {
    if (username == "UserName")
        return true;
    return false;
}

module.exports = {
    getCampusById,
    getAllCampuses,
    getCampById,
    getCampsByCampusId,
    getGroupById,
    getGroupsByCampId,
    getCampActivities,
    submitSchedule,
    checkLogin,
    existsUser
}