/**
 * Class representing a floor plan in a campus.
 */
module.exports = class FloorPlan {
    /**
     * 
     * @param {string} name - The name of this floor.
     * @param {string} campusID - The ID of the campus this floor plan belongs to.
     * @param {string} floorPlanID - The unique ID given by <CONTROLLER>.
     */
    constructor (name, campusID, floorPlanID) {
        this.name = name;
        this.campusID = campusID;
        this.floorPlanID = floorPlanID;
        this.rooms = new Set();
    }
    /**
     * @returns number of rooms in this floor plan.
     */
    numRoom() {
        return this.rooms.size;
    }
    /**
     * @param {Room} newRoom - The new room to be added to this floor plan. 
     */
    addRoom(newRoom) {
        this.camps.add(newRoom);
    }
}