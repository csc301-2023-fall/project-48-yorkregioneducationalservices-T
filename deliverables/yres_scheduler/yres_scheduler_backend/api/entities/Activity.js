/**
 * This module represents the Activity entity.
 * 
 * @module api/entities/Activity
 */

/** @const {number} FILLER_TYPE Represents the filler type for an activity */
const FILLER_TYPE = 0;

/** @const {number} COMMON_TYPE Represents the common type for an activity */
const COMMON_TYPE = 1;

/**
 * Activity class represents an activity involved in a camp schedule. It stores
 * the activity ID, name, duration, type and number of occurences (potentially minimum).
 * 
 * @class Activity
 */
class Activity {

    /**
     * Create an Activity entity.
     * @param {uuid} [activity_id] UUID to identify unique activity
     * @param {string} [name] The name of the activity
     * @param {number} [duration] The duration of the activity
     * @param {number} [type] The type of activity (FILLER_TYPE or COMMON_TYPE)
     * @param {number} [num_occurences] How many instances of the activity should be included in the schedule (or minimum if FILLER_TYPE)
     */
    constructor(activity_id,
                name,
                duration,
                type,
                num_occurences) {
        this._activity_id = activity_id;
        this._name = name;
        this._duration = duration;
        this._type = type;
        this._num_occurences = num_occurences;
    }

    /**
     * Get the number of occurences for this activity.
     * @return {number} How many instances of the activity should be included in the schedule (or minimum if FILLER_TYPE)
     */
    get num_occurences() {
        return this._num_occurences;
    }

    /**
     * Set the number of occurences for this activity.
     * @param {number} [new_num_occurences] The new num_occurences of the activity
     */
    set num_occurences(new_num_occurences) {
        this._num_occurences = new_num_occurences;
    }

    /**
     * Get the name of this activity.
     * @return {string} The name of the activity
     */
    get name() {
        return this._name;
    }

    /**
     * Set the name for this activity.
     * @param {string} [new_name] The new name of the activity
     */
    set name(new_name) {
        this._name = new_name;
    }

    /**
     * Get the duration of this activity.
     * @return {number} The duration of the activity
     */
    get duration() {
        return this._duration;
    }

    /**
     * Set the duration for this activity.
     * @param {number} [new_duration] The new duration of the activity
     */
    set duration(new_duration) {
        this._duration = new_duration;
    }

    /**
     * Get the type of this activity.
     * @return {number} The type of activity (FILLER_TYPE or COMMON_TYPE)
     */
    get type() {
        return this._type;
    }

    /**
     * Set the type for this activity.
     * @param {number} [new_type] The new type of activity (FILLER_TYPE or COMMON_TYPE)
     */
    set type(new_type) {
        this._type = new_type;
    }

    /**
     * Get the activity_id of this activity.
     * @return {uuid} UUID to identify unique activity
     */
    get activity_id() {
        return this._activity_id;
    }

    /**
     * Get the FILLER_TYPE constant.
     * @return {number} The FILLER_TYPE constant.
     */
    get FILLER_TYPE() {
        return FILLER_TYPE;
    }

    /**
     * Get the COMMON_TYPE constant.
     * @return {number} The COMMON_TYPE constant.
     */
    get COMMON_TYPE() {
        return COMMON_TYPE;
    }

    toJSON() {
        return {
            activity_id: this._activity_id,
            name: this._name,
            duration: this._duration,
            type: this._type,
            num_occurences: this._num_occurences
        }
    }


}

module.exports = Activity;