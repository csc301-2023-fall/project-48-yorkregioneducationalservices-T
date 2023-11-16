/**
 * Class representing a summer camp unit.
 */
module.exports = class Camp {
    /**
     * Create a new camp object which will then be added to a campus' set of camps.
     * 
     * @param {string} camp_id - The unique ID assigned by <CONTROLLER>. 
     * @param {string} name - The name of the camp from frontend user input.
     * @param {Set} activity_ids - The set of IDs of activities all groups of this camp do.
     * @param {string} campus_id - The ID of the campus this camp is in.
     */
    constructor(camp_id, name, activity_ids, campus_id) {
        this.camp_id = camp_id;
        this.name = name;
        this.activity_ids = activity_ids;
        this.campus_id = campus_id;
    }

    /**
     * @returns number of activities in this camp.
     */
    numActivities() {
        return this.activity_ids.size;
    }

    /**
     * @param {string} newActivityID - The new activity id to be added to this camp.
     */
    addActivity(newActivityID) {
        this.activity_ids.add(newActivityID);
    }

    getActivityIds() {
        return [...this.activity_ids];
    }
}
