const Camp = require("../entities/Camp");
const uuid = require('uuid');
const { client } = require('./db');


function mapRowToCamp(row) {
    return new Camp(
        row.camp_id,
        row.name,
        new Set(),
        row.campus_id
    );
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

async function getActivityIds(camp) {  
    const queryGetActivityIds = `Select activity_id from Activity where camp_id = $1;`;  

    const values = [camp.camp_id];
    try {
        const result = await client.query(queryGetActivityIds, values);
 
        promises = result.rows.map(async (row) => {
            camp.activity_ids.add(row.activity_id);
        });

        await Promise.all(promises);

    } catch (error) {
        // Handle errors appropriately
        console.error('Error while fetching activity ids:', error);
        throw new Error('Failed to fetch activity ids');
    }

  }

async function getCampsByCampusId(campus_id) {

    var all_camps;
    return new Promise(async (resolve, reject) => {
        const result = await new Promise((queryResolve, queryReject) => {
            client.query(`SELECT * FROM Camp WHERE campus_id = '${campus_id}';`, function (err, result) {
                if (err) {
                    queryReject(err);
                } else {
                    queryResolve(result);
                }
            });
        });

        const rows = result.rows;

        all_camps = rows.map(mapRowToCamp);

        for (const camp of all_camps) {
            await getActivityIds(camp);
        }        
        
        resolve(all_camps);
    });
}

async function createCamp(name, campus_id) {
    camp_id = uuid.v1()

    return new Promise((resolve, reject) => {
        client.query(`INSERT INTO Camp(camp_id, name, campus_id) VALUES('${camp_id}', '${name}', '${campus_id}');`, function (err, result) {
            if (err){
                reject(err);
            }
        });
        resolve(true);
    });
}

module.exports = {
    getCampById,
    getCampsByCampusId,
    createCamp
}