/**
 * Class representing an activity room.
 */
module.exports = class Room {
    /**
     * Create a new room which can then be added to a campus' set of rooms.
     * 
     * @param {string} room_id - The unique ID assigned by <CONTROLLER>.
     * @param {string} name - The name of this room given by user input.
     * @param {string} campus_id - The ID of the campus this room belongs to.
     */
    constructor(room_id, name, campus_id) {
        this.room_id = room_id;
        this.name = name;
        this.campus_id = campus_id;
    }
}