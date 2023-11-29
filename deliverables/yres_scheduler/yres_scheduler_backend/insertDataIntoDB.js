const studentDB = require("./api/db/studentDbPlugin");
const counselorDB = require("./api/db/counselorDbPlugin");
const activityDB = require("./api/db/activityDbPlugin");
const roomDB = require("./api/db/roomDbPlugin");
const Student = require("./api/entities/Student");
const Counselor = require("./api/entities/Counselor");
const uuid = require('uuid');

async function prepration() {
    
var student;
for (let i = 1; i < 21; i++) {
    student = new Student(
        i.toString(),
        i.toString(),
        'last',
        `first ${i}`,
        i % 15,
        'M',
        'C1', [], []);
    await studentDB.createStudent(student);
}
for (let i = 21; i < 41; i++) {
    student = new Student(
        i.toString(),
        i.toString(),
        'last',
        `first ${i}`,
        i % 15,
        'F',
        'C1', [], []);
    await studentDB.createStudent(student);
}
for (let i = 41; i < 61; i++) {
    student = new Student(
        i.toString(),
        i.toString(),
        'last',
        `first ${i}`,
        i % 15,
        'M',
        'C2', [], []);
    await studentDB.createStudent(student);
}
for (let i = 61; i < 81; i++) {
    student = new Student(
        i.toString(),
        i.toString(),
        'last',
        `first ${i}`,
        i % 15,
        'F',
        'C2', [], []);
    await studentDB.createStudent(student);
}

var counselor;
var c1 = uuid.v1();
var c2 = uuid.v1();
for (let c = 1; c < 25; c++) {
    counselor = new Counselor(c.toString(), 'last', `first ${c}`, c1);
    await counselorDB.createCounselor(counselor);
}
// for (let c = 4; c < 8; c++) {
//     counselor = new Counselor(c.toString(), 'last', `first ${c}`, c2);
//     await counselorDB.createCounselor(counselor);
// }
// for (let c = 8; c < 13; c++) {
//     counselor = new Counselor(c.toString(), 'last', `first ${c}`, '');
//     await counselorDB.createCounselor(counselor);
// }
// for (let c = 12; c < 17; c++) {
//     counselor = new Counselor(c.toString(), 'last', `first ${c}`, '');
//     await counselorDB.createCounselor(counselor);
// }


var lst = [];
for (let r = 0; r < 20; r++) {
    await lst.push(uuid.v1());
}
for (let r = 0; r < 20; r++) {
    await roomDB.createRoom(lst[r], `Room ${r}`, '');
}

await activityDB.createActivity(uuid.v1(), 'Class 1', 1, 'common', 20, 'C1', `${lst[0]},${lst[1]},${lst[2]},${lst[3]},${lst[4]},${lst[5]},${lst[6]},${lst[7]},${lst[8]},${lst[9]},${lst[10]},${lst[11]},${lst[12]},${lst[13]},${lst[14]},${lst[15]},${lst[16]},${lst[17]},${lst[18]},${lst[19]}`);
await activityDB.createActivity(uuid.v1(), 'Class 2', 1, 'common', 20, 'C2', `${lst[0]},${lst[1]},${lst[2]},${lst[3]},${lst[4]},${lst[5]},${lst[6]},${lst[7]},${lst[8]},${lst[9]},${lst[10]},${lst[11]},${lst[12]},${lst[13]},${lst[14]},${lst[15]},${lst[16]},${lst[17]},${lst[18]},${lst[19]}`);
await activityDB.createActivity(uuid.v1(), 'Special 1', 2, 'common', 5, 'C1', `${lst[6]},${lst[7]},${lst[8]},${lst[9]},${lst[10]}`);
await activityDB.createActivity(uuid.v1(), 'Special 2', 2, 'common', 5, 'C2', `${lst[6]},${lst[7]},${lst[8]},${lst[9]},${lst[10]}`);
await activityDB.createActivity(uuid.v1(), 'Other 1', 1, 'filler', 1, 'C1', `${lst[0]},${lst[1]},${lst[2]},${lst[3]},${lst[4]},${lst[5]},${lst[6]},${lst[7]},${lst[8]},${lst[9]},${lst[10]},${lst[11]},${lst[12]},${lst[13]},${lst[14]},${lst[15]},${lst[16]},${lst[17]},${lst[18]},${lst[19]}`);
await activityDB.createActivity(uuid.v1(), 'Other 2', 1, 'filler', 1, 'C2', `${lst[0]},${lst[1]},${lst[2]},${lst[3]},${lst[4]},${lst[5]},${lst[6]},${lst[7]},${lst[8]},${lst[9]},${lst[10]},${lst[11]},${lst[12]},${lst[13]},${lst[14]},${lst[15]},${lst[16]},${lst[17]},${lst[18]},${lst[19]}`);

}
prepration();

module.exports = {
    prepration
}