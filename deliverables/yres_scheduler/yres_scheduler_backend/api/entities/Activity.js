/**
 * This module represents the Activity entity.
 * 
 * @module api/entities/Activity
 */
/**
 * Activity class represents an activity involved in a camp schedule. It stores
 * the activity ID, name, duration, type and number of occurences and a list of rooms.
 * 
 * @class Activity
 */
class Activity {

    /**
     * Create an Activity entity.
     * @param {uuid} activity_id - UUID to identify unique activity
     * @param {string} name - The name of the activity
     * @param {number} duration - The duration of the activity
     * @param {string} type - The type of activity ("common"/"filler")
     * @param {number} num_occurences - How many instances of the activity should be included in the schedule (or minimum if FILLER_TYPE)
     * @param {uuid} camp_id - UUID of the camp this activity belongs to
     */
    constructor(activity_id, name, duration, type, num_occurences, camp_id) {
        this.activity_id = activity_id;
        this.name = name;
        this.duration = duration;
        this.type = type;
        this.num_occurences = num_occurences;
        this.camp_id = camp_id;
        this.rooms = [];
    }
}

module.exports = Activity;