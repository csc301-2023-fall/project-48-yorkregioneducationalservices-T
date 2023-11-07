/**
 * Class representing a staff profile.
 */
module.exports = class Staff {

    /**
     * Create a new staff profile.
     * 
     * @param {number} stID - The unique ID of this staff.
     * @param {string} lastname
     * @param {string} firstname
     * @param {number} campusID - The ID of the campus this staff registers.
     */
    constructor (stID, lastname, firstname, campusID) {
        this.stID = stID;
        this.lastname = lastname;
        this.firstname = firstname;
        this.campusID = campusID;
    }


    /**
    * Dummy database used for testing.
    */
    static staffs = [
        {
            stID: "ST00001",
            lastname: "Dummy",
            firstname: "Staff 1",
            campusID: "C0001"
        },
        {
            stID: "ST00002",
            lastname: "Dummy",
            firstname: "Staff 2",
            campusID: "C0001"
        },
        {
            stID: "ST00004",
            lastname: "Dummy",
            firstname: "Staff 4",
            campusID: "C0001"
        }
    ];
}