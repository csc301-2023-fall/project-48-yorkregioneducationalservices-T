/**
 * Class representing an activity.
 */
module.exports = class Activity {
    /**
     * 
     * @param {string} activity_id - uuid.
     * @param {string} name - name of activity.
     * @param {number} duration - hours of this activity.
     * @param {string} type - one of "common"/"filler".
     * @param {number} num_occurences - number of times this activity should occur in the schedule.
     * @param {Array} room_ids - an array of IDs of rooms where this activity can be held.
     */
    constructor(activity_id, name, duration, type, num_occurences, room_ids) {
        this.activity_id = activity_id;
        this.name = name;
        this.duration = duration; // hours
        this.type = type;
        this.num_occurences = num_occurences;
        this.room_ids = room_ids;
    }

}