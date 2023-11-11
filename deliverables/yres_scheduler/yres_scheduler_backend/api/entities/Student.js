/**
 * Class representing a student profile.
 */
module.exports = class Student {
    /**
     * Create a new student profile.
     * 
     * @param {string} student_id - The unique ID of this student.
     * @param {string} lastname
     * @param {string} firstname 
     * @param {number} age 
     * @param {string} sex 
     * @param {string[]} friend_ids - An array of student IDs that this student prefers to work with.
     * @param {string[]} enemy_ids - An array of student IDs that this student doesn't want to work with.
    */
    constructor(student_id, lastname, firstname, age, sex, friend_ids, enemy_ids) {
        this.student_id = student_id;
        this.lastname = lastname;
        this.firstname = firstname;
        this.age = age;
        this.sex = sex;
        this.friend_ids = friend_ids;
        this.enemy_ids = enemy_ids;
      }
}