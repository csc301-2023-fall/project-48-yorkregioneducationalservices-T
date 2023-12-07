const studentDB = require("../db/studentDbPlugin");
const counselorDB = require("../db/counselorDbPlugin");
const activityDB = require("../db/activityDbPlugin");
const roomDB = require("../db/roomDbPlugin");
const uuid = require('uuid');

async function prepration() {
    
var student;
for (let i = 1; i < 81; i++) {

    await studentDB.createStudent(i.toString(),
    'last',
    `first ${i}`,
    i % 15 + 1,
    'M', '', '');
}

var counselor;
var c1 = uuid.v1();
var c2 = uuid.v1();
for (let c = 1; c < 25; c++) {
    await counselorDB.createCounselor(`first ${c}`, `last${c}`);
}

var lst = [];
for (let r = 1; r < 21; r++) {
    await lst.push(r);
}
for (let r = 0; r < 20; r++) {
    await roomDB.createRoom(lst[r], '');
}


await activityDB.createActivity('Class 1', 1, 'common', 20, 1, `${lst[0]},${lst[1]},${lst[2]},${lst[3]},${lst[4]},${lst[5]},${lst[11]},${lst[12]},${lst[13]},${lst[14]},${lst[15]},${lst[16]},${lst[17]},${lst[18]},${lst[19]}`);
// await activityDB.createActivity('Class 2', 1, 'common', 20, 'C2', `${lst[0]},${lst[1]},${lst[2]},${lst[3]},${lst[4]},${lst[5]},${lst[6]},${lst[7]},${lst[8]},${lst[9]},${lst[10]},${lst[11]},${lst[12]},${lst[13]},${lst[14]},${lst[15]},${lst[16]},${lst[17]},${lst[18]},${lst[19]}`);
await activityDB.createActivity('Gym', 2, 'common', 5, 1, `${lst[6]},${lst[7]},${lst[8]},${lst[9]},${lst[10]}`);
// await activityDB.createActivity('Special 2', 2, 'common', 5, 'C2', `${lst[6]},${lst[7]},${lst[8]},${lst[9]},${lst[10]}`);
await activityDB.createActivity('Personal Study', 1, 'filler', 1, 1, `${lst[0]},${lst[1]},${lst[2]},${lst[3]},${lst[4]},${lst[5]},${lst[6]},${lst[7]},${lst[8]},${lst[9]},${lst[10]},${lst[11]},${lst[12]},${lst[13]},${lst[14]},${lst[15]},${lst[16]},${lst[17]},${lst[18]},${lst[19]}`);
// await activityDB.createActivity('Other 2', 1, 'filler', 1, 'C2', `${lst[0]},${lst[1]},${lst[2]},${lst[3]},${lst[4]},${lst[5]},${lst[6]},${lst[7]},${lst[8]},${lst[9]},${lst[10]},${lst[11]},${lst[12]},${lst[13]},${lst[14]},${lst[15]},${lst[16]},${lst[17]},${lst[18]},${lst[19]}`);

}
prepration();

module.exports = {
    prepration
}