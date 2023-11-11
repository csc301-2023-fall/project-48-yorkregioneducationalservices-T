/**
 * Class representing an activity room.
 */
module.exports = class Room {
    /**
     * Create a new room which can then be added to a campus' set of rooms.
     * 
     * @param {string} room_id - The unique ID assigned by <CONTROLLER>.
     * @param {string} name - The name of this room given by user input.
     * @param {Set} activity_ids - The type (use) of this room given by user input.
     */
    constructor(room_id, name, activity_ids) {
        this.room_id = room_id;
        this.name = name;
        this.activity_ids = activity_ids;
    }
}