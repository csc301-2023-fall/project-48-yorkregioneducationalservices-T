/** 
 * Class representing a campus to hold the summer camp. 
 * A campus has its name and unique campusID, a set of all rooms, a set of all camps.
 */
module.exports = class Campus {
    /** 
     * Create a campus with a name, unique ID, a set of camps and a set of rooms.
     * 
     * @param {string} campus_id - The unique ID assigned by <CONTROLLER>.
     * @param {string} name - The name of the campus from frontend user input.
     * @param {Set} camp_ids - The set of IDs of camps in this campus.
     * @param {Set} room_ids - The set of IDs of rooms in this campus.
     */
    constructor (campus_id, name, camp_ids, room_ids) {
        this.campus_id = campus_id;
        this.name = name;
        this.camp_ids = camp_ids;
        this.room_ids = room_ids;
    }

    /**
     * @returns number of rooms in this campus.
     */
    numRooms() {
        return this.room_ids.size;
    }

    /**
     * @param {string} newRoomID - The new room id to be added to this campus.
     */
    addRoom(newRoomID) {
        this.room_ids.add(newRoomID);
    }

    /**
     * @returns number of camps in this campus.
     */
    numCamps() {
        return this.camp_ids.size;
    }

    /**
     * @param {string} newCampID - The new camp id to be added to this campus. 
     */
    addCamp(newCampID) {
        this.camp_ids.add(newCampID);
    }

    getCampIds() {
        return [...this.camp_ids];
    }

    getRoomIds() {
        return [...this.room_ids];
    }
}
