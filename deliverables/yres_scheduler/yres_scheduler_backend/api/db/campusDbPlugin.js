const Campus = require("../entities/Campus");
const uuid = require('uuid');
const { client } = require('./db');

function mapRowToCampus(row) {
    return new Campus(
        row.campus_id,
        row.name,
        new Set(),
        new Set()
    );
}


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

    var all_campuses;
    return new Promise(async (resolve, reject) => {
        const result = await new Promise((queryResolve, queryReject) => {
            client.query(`SELECT * FROM Campus;`, (err, result) => {
                if (err) {
                    queryReject(err);
                } else {
                    queryResolve(result);
                }
            });
        });

        const rows = result.rows;

        all_campuses = rows.map(mapRowToCampus);

        for (const campus of all_campuses) {
            await client.query(`Select camp_id from Camp where campus_id = '${campus.campus_id}';`, (err, result)=>{  
                for (var i=0; i  < result.length; i++) {
                    campus.camp_ids.add(result.rows[i].camp_id);
                }
            });

            
            await client.query(`Select room_id from Room where campus_id = '${campus.campus_id}';`, (err, result)=>{
                for (var i=0; i  < result.length; i++) {
                    room_ids.add(result.rows[i].room_id);
                }
            });
        }

        resolve(all_campuses);
    });
}

async function createCampus(name) {
    campus_id = uuid.v1();
    
    return new Promise((resolve, reject) => {
        client.query(`INSERT INTO Campus(campus_id, name) VALUES('${campus_id}', '${name}');`, function (err, result) {
            if (err){
                reject(err);
            }
        });
        
        resolve(true);
    });
}

module.exports = {
    getCampusById,
    getAllCampuses,
    createCampus
}