const Schedule = require("./Schedule");
/**
 * Class representing a group of students and counselors.
 */
module.exports = class Group {
    /**
     * Create a new group.
     * 
     * @param {string} group_id - The unique ID assigned by <CONTROLLER>.
     * @param {string} name - The name of this group generated automatically.
     * @param {string} schedule_id - The ID of the schedule of this group.
     * @param {Set} student_ids - The IDs of the students that beglong to this group.
     * @param {Set} counselor_ids - The IDs of the counselors that belongs to this group.
     * @param {string} camp_id - The ID of the camp this group belongs to.
     */
    constructor(group_id, name, schedule_id, student_ids, counselor_ids, camp_id) {
        this.group_id = group_id;
        this.name = name;
        this.schedule_id = schedule_id;
        this.student_ids = student_ids;
        this.counselor_ids = counselor_ids;
        this.camp_id = camp_id;
        this.schedule = undefined;
    }
}