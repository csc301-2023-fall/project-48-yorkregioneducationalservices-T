/**
 * Class representing a group of students and counselors.
 */
module.exports = class Group {
    /**
     * Create a new group.
     * 
     * @param {string} group_id - The unique ID assigned by <CONTROLLER>.
     * @param {string} schedule_id - The ID of the schedule of this group.
     * @param {Set} student_ids - The IDs of the students that beglong to this group.
     * @param {Set} counselor_ids - The IDs of the counselors that belongs to this group.
     * @param {string} camp_id - The ID of the camp this group belongs to.
     */
    constructor(group_id, schedule_id, student_ids, counselor_ids, camp_id) {
        this.group_id = group_id;
        this.schedule_id = schedule_id;
        this.student_ids = student_ids;
        this.counselor_ids = counselor_ids;
        this.camp_id = camp_id;
    }

    /**
     * @returns number of students in this group.
     */
    numStudents() {
        return this.student_ids.size;
    }

    /**
     * Add a student id to the set.
     * 
     * @param {string} newStudentID - student id to be added.
     */
    addStudents(newStudentID) {
        this.student_ids.add(newStudentID);
    }

    /**
     * @returns number of counselors in this group.
     */
    numCounselors() {
        return this.counselor_ids.size;
    }

    /**
     * Add a counselor id to the set.
     * 
     * @param {string} newCounselorID - counselor id to be added.
     */
    addCounselor(newCounselorID) {
        this.counselor_ids.add(newCounselorID);
    }

    /**
     * Get the students in a list.
     * 
     * @returns student_ids as an ordered list.
     */
    getStudentIds() {
        return [...this.student_ids];
    }

    /**
     * Get the counselors in a list.
     * 
     * @returns counselor_ids as an ordered list.
     */
    getCounselorIds() {
        return [...this.counselor_ids];
    }
}