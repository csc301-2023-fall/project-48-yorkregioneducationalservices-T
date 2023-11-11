const Activity = require("../entities/Activity");
const Camp = require("../entities/Camp");

const {Client} = require('pg')

const client = new Client({
    host: 'db',
    user: "summercamp",
    port: 5432,
    password: "csc301",
    database: "summercamp_db"
});

client.connect();

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
    getCampActivities,
    submitSchedule,
    getCampById,
    checkLogin,
    existsUser
}