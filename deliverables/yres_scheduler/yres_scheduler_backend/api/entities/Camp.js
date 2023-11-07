/**
 * Class representing a summer camp unit.
 */
module.exports = class Camp {
    static CAMP_MAX_STUDENT = 25;
    static CAMP_MAX_COUNSELOR = 2;
    /**
     * Create a new camp object which will then be added to a campus' set of camps.
     * 
     * @param {number} age_type - A number representing the age range of this camp.
     * @param {string} campID - The unique ID assigned by <CONTROLLER>. 
     */
    constructor(age_type, campID) {
        this.age_type = age_type;
        this.campID = campID;
        this.students = new Set();
        this.counselors = new Set();
    }
    /**
     * @returns number of students in this camp.
     */
    numStudents() {
        return this.students.size;
    }
    /**
     * Add a student object to the set (with size < CAMP_MAX_STUDENT).
     * 
     * @param {Student} newStudent - a student object to be added.
     * @returns true if student is added, false if the set is full.
     */
    addStudents(newStudent) {
        if (this.students.size == Camp.CAMP_MAX_STUDENT)
            return false;
        this.students.add(newStudent);
        return true;
    }
    /**
     * @returns number of counselors in this camp.
     */
    numCounselors() {
        return this.counselors.size;
    }
    /**
     * Add a counselor object into the set (with size < CAMP_MAX_COUNSELOR).
     * 
     * @param {Counselor} newCounselor - a counselor object to be added.
     * @returns true if counselor is added, false if the set is full.
     */
    addCounselor(newCounselor) {
        if (this.counselors.size == Camp.CAMP_MAX_COUNSELOR)
            return false;
        this.counselors.add(newCounselor);
        return true;
    }
}
