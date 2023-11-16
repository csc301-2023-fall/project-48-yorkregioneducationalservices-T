const Group = require("../entities/Group");
const uuid = require('uuid');
const { client } = require('./db');


function mapRowToGroup(row) {
    return new Group(
        row.camp_group_id,
        row.schedule_id,
        new Set(),
        new Set(),
        row.camp_id
    );
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

    var all_groups;
    return new Promise(async (resolve, reject) => {
        const result = await new Promise((queryResolve, queryReject) => {
            client.query(
            `SELECT * 
            FROM CampGroup 
            WHERE EXISTS (
                SELECT *
                FROM Camp
                WHERE CampGroup.camp_id = Camp.camp_id AND Camp.campus_id = '${campus_id}'
                );`, function (err, result) {
                if (err) {
                    queryReject(err);
                } else {
                    queryResolve(result);
                }
            });
        });

        const rows = result.rows;

        all_groups = rows.map(mapRowToGroup);

        for (const group of all_groups) {
            await client.query(`Select student_id from Student where camp_group_id = '${group.group_id}';`, (err, result)=>{
                for (var i=0; i  < result.length; i++) {
                    group.student_ids.add(result.rows[i].student_id);
                }
            });
            
            await client.query(`Select counselor_id from Counselor where camp_group_id = '${group.group_id}';`, (err, result)=>{
                for (var i=0; i  < result.length; i++) {
                    group.counselor_ids.add(result.rows[i].counselor_id);
                }
            });
        }

        resolve(all_groups);
    });
}

async function createGroup(camp_id) {
    group_id = uuid.v1();

    return new Promise((resolve, reject) => {
        client.query(`INSERT INTO CampGroup(camp_group_id, camp_id) VALUES('${group_id}', '${camp_id}');`, function (err, result) {
            if (err){
                reject(err);
            }
        });

        resolve(true);
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


module.exports = {
    getGroupById,
    getGroupsByCampusId,
    createGroup,
    deleteAllGroups
}