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
     * @param {Set<string>} friend_ids - A set of student IDs that this student prefers to work with.
     * @param {Set<string>} enemy_ids - A set of student IDs that this student doesn't want to work with.
    */
    constructor(student_id, lastname, firstname, age, sex, friend_ids, enemy_ids) {
        this._student_id = student_id;
        this.lastname = lastname;
        this.firstname = firstname;
        this.age = age;
        this.sex = sex;
        this.friend_ids = friend_ids;
        this.enemy_ids = enemy_ids;
    }

    /**
    * Getters and setters 
    */
    get student_id() {
        return this._student_id;
    }

    set student_id(newStudentId) {
        this._student_id = newStudentId;
    }

    getFriendIds() {
        return new Set(this.friend_ids);
    }

    getEnemyIds() {
        return new Set(this.enemy_ids);
    }

    /**
     * Add a friend ID to the set of friends.
     * @param {string} friendId - The ID of the friend to add.
     */
    addFriend(friendId) {
        this.friend_ids.add(friendId);
    }

    /**
     * Remove a friend ID from the set of friends.
     * @param {string} friendId - The ID of the friend to remove.
     */
    removeFriend(friendId) {
        this.friend_ids.delete(friendId);
    }

    /**
     * Add an enemy ID to the set of enemies.
     * @param {string} enemyId - The ID of the enemy to add.
     */
    addEnemy(enemyId) {
        this.enemy_ids.add(enemyId);
    }

    /**
     * Remove an enemy ID from the set of enemies.
     * @param {string} enemyId - The ID of the enemy to remove.
     */
    removeEnemy(enemyId) {
        this.enemy_ids.delete(enemyId);
    }
}