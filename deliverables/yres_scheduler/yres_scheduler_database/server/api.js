const client = require('./connection.js')

const express = require('express'),
      app = express();

const bodyParser = require("body-parser");

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next();
});

app.use(bodyParser.json());
app.use(
    bodyParser.urlencoded({
      extended: true,
    }),
);
 
app.listen(3001, ()=>{
    console.log("Sever is now listening at port 3300");
})

client.connect();

//SELECTS START HERE
app.get('/users', (req, res)=>{
    client.query(`Select * from summer_camp.LoginInfo`, (err, result)=>{
        res.set({'Access-Control-Allow-Origin': '*'});
        
        if(!err){
            res.send(result.rows);
        } else {
            console.log(err);
            res.send(err);
        }
    });
})

app.get('/students', (req, res)=>{
    client.query(`Select * from summer_camp.Student`, (err, result)=>{
        res.set({'Access-Control-Allow-Origin': '*'});
        
        if(!err){
            res.send(result.rows);
        } else {
            console.log(err);
            res.send(err);
        }
    });
})

app.get('/friendpreferences', (req, res)=>{
    client.query(`Select * from summer_camp.FriendPreference`, (err, result)=>{
        res.set({'Access-Control-Allow-Origin': '*'});
        
        if(!err){
            res.send(result.rows);
        } else {
            console.log(err);
            res.send(err);
        }
    });
})

app.get('/rooms', (req, res)=>{
    client.query(`Select * from summer_camp.Room`, (err, result)=>{
        res.set({'Access-Control-Allow-Origin': '*'});
        
        if(!err){
            res.send(result.rows);
        } else {
            console.log(err);
            res.send(err);
        }
    });
})

app.get('/counselors', (req, res)=>{
    client.query(`Select * from summer_camp.Counselor`, (err, result)=>{
        res.set({'Access-Control-Allow-Origin': '*'});
        
        if(!err){
            res.send(result.rows);
        } else {
            console.log(err);
            res.send(err);
        }
    });
})

//INSERTIONS START HERE
app.post('/users', (req, res)=>{
    const user = req.body;
    console.log(req);
    let insertUserQuery = `INSERT INTO summer_camp.LoginInfo(username, password) values('${user.username}', '${user.password}')`
    client.query(insertUserQuery, (err, result)=>{
        res.set({'Access-Control-Allow-Origin': '*'});
        if(!err){
            res.send('Inserted user!');
        } else {
            console.log(err);
            res.send(err);
        }
    });
})

app.post('/students', (req, res)=>{
    const student = req.body;
    let insertStudentQuery = `INSERT INTO summer_camp.Student(sID, firstName, lastName, grade, genderType, groupID) 
    values('${student.SID}', '${student.first_name}', '${student.last_name}', '${student.grade}', '${student.gender}', null)`
    client.query(insertStudentQuery, (err, result)=>{
        res.set({'Access-Control-Allow-Origin': '*'});
        
        if(!err){
            res.send('Inserted student!');
        } else {
            console.log(err);
            res.send(err);
        }
    });
})

app.post('/friendpreferences', (req, res)=>{
    const preference = req.body;
    let insertPreferenceQuery = `INSERT INTO summer_camp.FriendPreference(SID1, SID2, isApart) 
    values('${preference.first_pref_SID}', '${preference.second_pref_SID}', '${preference.relationship}')`
    client.query(insertPreferenceQuery, (err, result)=>{
        res.set({'Access-Control-Allow-Origin': '*'});
        
        if(!err){
            res.send('Inserted preference!');
        } else {
            console.log(err);
            res.send(err);
        }
    });
})

app.post('/rooms', (req, res)=>{
    const room = req.body;
    let insertRoomQuery = `INSERT INTO summer_camp.Room(rID, roomType) 
    values('${room.room_num}', '${room.room_type}')`
    client.query(insertRoomQuery, (err, result)=>{
        res.set({'Access-Control-Allow-Origin': '*'});
        
        if(!err){
            res.send('Inserted room!');
        } else {
            console.log(err);
            res.send(err);
        }
    });
})

app.post('/counselors', (req, res)=>{
    const counselor = req.body;
    let insertCounselorQuery = `INSERT INTO summer_camp.Counselor(firstname, lastname, groupID) 
    values('${counselor.counselor_firstname}', '${counselor.counselor_lastname}', null)`
    client.query(insertCounselorQuery, (err, result)=>{
        res.set({'Access-Control-Allow-Origin': '*'});
        
        if(!err){
            res.send('Inserted counselor!');
        } else {
            console.log(err);
            res.send(err);
        }
    });
})

//UPDATES START HERE
app.put('/users', (req, res)=>{
    const user = req.body;
    let updateUserQuery = 
    `UPDATE summer_camp.LoginInfo
    SET password = '${user.password}'
    WHERE username = '${user.username}'`
    client.query(updateUserQuery, (err, result)=>{
        res.set({'Access-Control-Allow-Origin': '*'});
        
        if(!err){
            res.send('Updated user!');
        } else {
            console.log(err);
            res.send(err);
        }
    });
})

app.put('/students', (req, res)=>{
    const student = req.body;
    let updateStudentQuery = 
    `UPDATE summer_camp.Student
    SET firstName = '${student.first_name}',
    lastName = '${student.last_name}',
    grade = '${student.grade}',
    genderType = '${student.gender}'
    WHERE sID = '${student.SID}'`
    client.query(updateStudentQuery, (err, result)=>{
        res.set({'Access-Control-Allow-Origin': '*'});
        
        if(!err){
            res.send('Updated student!');
        } else {
            console.log(err);
            res.send(err);
        }
    });
})

app.put('/friendpreferences', (req, res)=>{
    const preference = req.body;
    let updatePreferenceQuery = 
    `UPDATE summer_camp.FriendPreference 
    SET isApart = '${preference.relationship}'
    WHERE SID1 = '${preference.first_pref_SID}'
    AND SID2 = '${preference.second_pref_SID}'`
    client.query(updatePreferenceQuery, (err, result)=>{
        res.set({'Access-Control-Allow-Origin': '*'});
        
        if(!err){
            res.send('Updated preference!');
        } else {
            console.log(err);
            res.send(err);
        }
    });
})

app.put('/rooms', (req, res)=>{
    const room = req.body;
    let updateRoomQuery = 
    `UPDATE summer_camp.Room 
    SET roomType = '${room.room_type}'
    WHERE rID = '${room.room_num}'`
    client.query(updateRoomQuery, (err, result)=>{
        res.set({'Access-Control-Allow-Origin': '*'});
        
        if(!err){
            res.send('Updated room!');
        } else {
            console.log(err);
            res.send(err);
        }
    });
})

app.put('/counselors', (req, res)=>{
    const counselor = req.body;
    let updateCounselorQuery = 
    `UPDATE summer_camp.Counselor
    SET firstname = '${counselor.counselor_firstname}',
    lastname = '${counselor.counselor_lastname}'
    WHERE cID = '${counselor.CID}'`
    client.query(updateCounselorQuery, (err, result)=>{
        res.set({'Access-Control-Allow-Origin': '*'});
        
        if(!err){
            res.send('Updated counselor!');
        } else {
            console.log(err);
            res.send(err);
        }
    });
})

//DELETES START HERE
app.delete('/users', (req, res)=>{
    const user = req.body;
    let deleteUserQuery = 
    `DELETE FROM summer_camp.LoginInfo
    WHERE username = '${user.username}'`
    client.query(deleteUserQuery, (err, result)=>{
        res.set({'Access-Control-Allow-Origin': '*'});
        
        if(!err){
            res.send('Deleted user!');
        } else {
            console.log(err);
            res.send(err);
        }
    });
})

app.delete('/students', (req, res)=>{
    const student = req.body;
    let deleteStudentQuery = 
    `DELETE FROM summer_camp.Student
    WHERE sID = '${student.SID}'`
    client.query(deleteStudentQuery, (err, result)=>{
        res.set({'Access-Control-Allow-Origin': '*'});
        
        if(!err){
            res.send('Deleted student!');
        } else {
            console.log(err);
            res.send(err);
        }
    });
})

app.delete('/friendpreferences', (req, res)=>{
    const preference = req.body;
    let deletePreferenceQuery = 
    `DELETE FROM summer_camp.FriendPreference
    WHERE SID1 = '${preference.first_pref_SID}'
    AND SID2 = '${preference.second_pref_SID}'`
    client.query(deletePreferenceQuery, (err, result)=>{
        res.set({'Access-Control-Allow-Origin': '*'});
        
        if(!err){
            res.send('Deleted preference!');
        } else {
            console.log(err);
            res.send(err);
        }
    });
})

app.delete('/rooms', (req, res)=>{
    const room = req.body;
    let deleteRoomQuery = 
    `DELETE FROM summer_camp.Room
    WHERE rID = '${room.room_num}'`
    client.query(deleteRoomQuery, (err, result)=>{
        res.set({'Access-Control-Allow-Origin': '*'});
        
        if(!err){
            res.send('Deleted room!');
        } else {
            console.log(err);
            res.send(err);
        }
    });
})

app.delete('/counselors', (req, res)=>{
    const counselor = req.body;
    let deleteCounselorQuery = 
    `DELETE FROM summer_camp.Counselor
    WHERE cID = '${counselor.CID}'`
    client.query(deleteCounselorQuery, (err, result)=>{
        res.set({'Access-Control-Allow-Origin': '*'});
        
        if(!err){
            res.send('Deleted counselor!');
        } else {
            console.log(err);
            res.send(err);
        }
    });
})

module.exports = app;
