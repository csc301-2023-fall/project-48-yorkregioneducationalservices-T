/**
 * Class representing a counselor profile.
 */
module.exports = class Counselor {

    /**
     * Create a new counselor profile.
     * 
     * @param {number} cID - The unique ID of this counselor.
     * @param {string} lastname
     * @param {string} firstname
     * @param {number} campusID - The ID of the campus this counselor registers.
     */
    constructor (cID, lastname, firstname, campusID) {
        this.cID = cID;
        this.lastname = lastname;
        this.firstname = firstname;
        this.campusID = campusID;
    }

    
    /**
     * Dummy database used for testing.
     */
    static counselors = [
        {
            cID: "co00001",
            lastname: "Dummy",
            firstname: "Counselor 1",
            campusID: "C0001"
        },
        {
            cID: "co00002",
            lastname: "Dummy",
            firstname: "Counselor 2",
            campusID: "C0001"
        },
        {
            cID: "co00004",
            lastname: "Dummy",
            firstname: "Counselor 4",
            campusID: "C0001"
        }
    ];
}
