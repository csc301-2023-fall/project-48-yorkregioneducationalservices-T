const Activity = require("../entities/Activity");
const Camp = require("../entities/Camp");

const {Client} = require('pg')
const config = require('config');


// TODO add diff connection configs, one for prod and other is dev/test 
// if ()


// TODO Move the connection to a diff file

const db = config.get('db');

const client = new Client({
    host: db.HOST,
    user: db.USER,
    port: db.PORT,
    password: db.PASSWORD,
    database: db.DATABASE
});

client.connect();

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

// Student db plugin methods
function getStudents() {

    const query = 'SELECT * FROM student';

    client.query(query, (err, result)=>{

        if (err){
            throw Error(err);
        }


        // Extract rows from the result
        const rows = result.rows;
        console.log(rows);

        // Map the rows to Student objects
        const students = rows.map(row => new Student(
        row.student_id,
        row.lastname,
        row.firstname,
        row.age,
        row.sex,
        new Set(), 
        new Set()
        ));

        return students;
        
    });


}


module.exports = {
    getCampActivities,
    submitSchedule,
    getCampById,
    checkLogin,
    existsUser,
    getStudents
}