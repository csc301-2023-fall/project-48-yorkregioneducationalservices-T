/**
 * Class representing an activity room.
 */
module.exports = class Room {
    /**
     * Create a new room which can then be added to a campus' set of rooms.
     * 
     * @param {string} name - The name of this room given by user input.
     * @param {number} type - The type (use) of this room given by user input.
     * @param {string} roomID - The unique ID assigned by <CONTROLLER>.
     */
    constructor(name, type, roomID) {
        this.name = name;
        this.type = type;
        this.roomID = roomID;
    }
}