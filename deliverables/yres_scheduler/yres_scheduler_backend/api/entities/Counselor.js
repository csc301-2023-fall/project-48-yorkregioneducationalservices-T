/**
 * Class representing a counselor profile.
 */
module.exports = class Counselor {

    /**
     * Create a new counselor profile.
     * 
     * @param {string} counselor_id - The unique ID of this counselor.
     * @param {string} lastname
     * @param {string} firstname
     * @param {string} campus_id - The ID of the campus this counselor registers.
     */
    constructor (counselor_id, lastname, firstname, campus_id) {
        this.counselor_id = counselor_id;
        this.lastname = lastname;
        this.firstname = firstname;
        this.campus_id = campus_id;
    }

    /**
    * Getters and setters 
    */
    get counselor_id() {
        return this._counselor_id;
    }

    set counselor_id(newCounselorId) {
        this._counselor_id = newCounselorId;
    }

    get campus_id() {
        return this._campus_id;
    }

    set campus_id(newCampusId) {
        this._campus_id = newCampusId;
    }
}
