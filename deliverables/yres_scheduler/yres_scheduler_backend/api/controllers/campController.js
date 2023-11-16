
const campService = require('../services/campService');

async function getCamp(req, res) {
    const camp_id = req.body.camp_id;

    const camp = await campService.getCamp(camp_id);

    return {
        camp: camp
    };
}

async function getAllCamps(req, res) {
    const campus_id = req.body.campus_id;
    const allcamps = await campService.getAllCamps(campus_id);

    return {
        camps: allcamps.map((camp) => { 
            return {
                ...camp,
                activity_ids: camp.getActivityIds()
            };
        })
    };
}

async function createCamp(req, res) {
    const name = req.body.name;
    const campus_id = req.body.campus_id;
    const status = await campService.createCamp(name, campus_id);

    return {
        status: status ? 'Success' : 'failure'
    };
}

module.exports = {
    getCamp,
    getAllCamps,
    createCamp
}