/** 
 * Class representing a campus to hold summer camp. 
 * A campus has its name and unique campusID, a set of all floor plans, a set of all camps.
 */
module.exports = class Campus {
    /** 
     * Create an empty campus with a name and an ID.
     * 
     * @param {string} name - The name of the campus from frontend user input.
     * @param {string} campusID - The unique ID assigned by <CONTROLLER>.
     */
    constructor (name, campusID) {
        this.name = name;
        this.campusID = campusID;
        this.floorPlans = new Set();
        this.camps = new Set();
    }
    /**
     * @returns number of floorPlans in this campus.
     */
    numFloorPlan() {
        return this.floorPlans.size;
    }
    /**
     * @param {FloorPlan} newFloorPlan - The new floor plan to be added to this campus.
     */
    addFloorPlan(newFloorPlan) {
        this.floorPlans.add(newFloorPlan);
    }
    /**
     * @returns number of camps in this campus.
     */
    numCamp() {
        return this.camps.size;
    }
    /**
     * @param {Camp} newCamp - The new camp to be added to this campus. 
     */
    addCamp(newCamp) {
        this.camps.add(newCamp);
    }
}
