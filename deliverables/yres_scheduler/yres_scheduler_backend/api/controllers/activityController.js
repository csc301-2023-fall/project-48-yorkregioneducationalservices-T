/** Activity Controller
 * 
 */
const db = require('../db/activityDbPlugin');
const uuid = require('uuid');

/** Get all activities in the database.
 * 
 * @returns JSON representation of all activities.
 */
async function getAllActivities(req, res) {
    const all_activities = await db.getAllActivities();
    return {
        rooms: all_activities
    };
}

/** Create a activity data row in the database with given information.
 * 
 * @param {JSON} req - POST request with body containing name, duration, type, num_occurences, an array of room_ids.
 * @returns if the insertion succeeded.
 */
async function createActivity(req, res) {
    const name = req.body.name;
    const duration = req.body.duration;
    const type = req.body.type;
    const num_occurences = req.body.num_occurences;
    const room_ids = req.body.room_ids;

    if (isNaN(name) || isNaN(duration) || isNaN(type) || isNaN(num_occurences)) {
        console.log('createActivity - Bad form: missing parameter');
        throw Error('createActivity - Bad form: missing parameter');
    }
    if (!Number.isInteger(duration) || !Number.isInteger(num_occurences)) {
        console.log('createRoom - Bad form: parameter in unexpected type, expecting integer');
        throw Error('createRoom - Bad form: parameter in unexpected type, expecting integer');
    }
    if (isNaN(room_ids))
        room_ids = new Array();
    var succeed = await db.createActivity(uuid.v1(), name, duration, type, num_occurences, room_ids);
    return {
        status: succeed ? 'Success' : 'failure'
    };
}

/** Delete an Activity data row in the database with given room_id.
 * 
 * @param {JSON} req - POST request with body containing the activity_id for activity to be deleted.
 * @returns 
 */
async function deleteActivityById(req, res) {
    const activity_id = req.body.activity_id;
    if (!uuid.validate(activity_id)) {
        console.log('deleteActivity - Bad form: unexpected uuid');
        throw Error('deleteActivity - Bad form: unexpected uuid');
    }
    const status = await db.deleteActivityById(room_id);

    return {
        status: status ? 'Success' : 'failure'
    }
}

module.exports = {
    getAllActivities,
    createActivity,
    deleteActivityById
}