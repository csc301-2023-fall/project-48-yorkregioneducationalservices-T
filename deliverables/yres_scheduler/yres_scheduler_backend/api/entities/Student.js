/**
 * Class representing a student profile.
 */
module.exports = class Student {
    /**
     * Create a new student profile.
     * 
     * @param {string} sID - The unique ID of this student.
     * @param {string} lastname
     * @param {string} firstname 
     * @param {number} age 
     * @param {string} gender 
     * @param {string} campusID - The ID of the campus this student registers.
     */
    constructor (sID, lastname, firstname, age, gender, campusID) {
        this.sID = sID;
        this.lastname = lastname;
        this.firstname = firstname;
        this.age = age;
        this.gender = gender;
        this.campusID = campusID;
    }

    /**
    * Dummy database used for testing.
    */
    static students = [
        {
            sID: "st00001",
            lastname: "Dummy",
            firstname: "Student 1",
            age: 9,
            gender: "M",
            campusID: "CA00001"
        },
        {
            sID: "st00002",
            lastname: "Dummy",
            firstname: "Student 2",
            age: 10,
            gender: "F",
            campusID: "CA00001"
        },
        {
            sID: "st00004",
            lastname: "Dummy",
            firstname: "Student 4",
            age: 12,
            gender: "M",
            campusID: "CA00001"
        }
    ];
}