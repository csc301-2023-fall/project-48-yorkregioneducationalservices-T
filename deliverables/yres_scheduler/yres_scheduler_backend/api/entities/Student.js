/**
 * Class representing a student profile.
 */
module.exports = class Student {
    /**
     * Create a new student profile.
     * 
     * @param {number} student_id - The unique ID of this student.
     * @param {number} student_ui_id - The unique ID of this student for the UI
     * @param {string} lastname
     * @param {string} firstname 
     * @param {number} age 
     * @param {string} sex 
     * @param {number} campus_id  -- Campus id that the student belongs to
     * @param {Set<string>} friend_ids - A set of student IDs that this student prefers to work with.
     * @param {Set<string>} enemy_ids - A set of student IDs that this student doesn't want to work with.
    */
    constructor(
        student_id, 
        student_ui_id, 
        lastname, 
        firstname, 
        age, 
        sex, 
        campus_id, 
        friend_ids, 
        enemy_ids) {
            
        this._student_id = student_id;
        this._student_ui_id = student_ui_id;
        this.lastname = lastname;
        this.firstname = firstname;
        this.age = age;
        this.sex = sex;
        this.campus_id = campus_id;
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

    get student_ui_id() {
        return this._student_ui_id;
    }

    set student_Ui_id(newStudentUiId) {
        this._student_ui_id = newStudentUiId;
    }

    getFriendIds() {
        return [...this.friend_ids];
    }

    getEnemyIds() {
        return [...this.enemy_ids];

    }

    /**
     * Add a friend ID to the set of friends.
     * @param {number} friendId - The ID of the friend to add.
     */
    addFriend(friendId) {
        this.friend_ids.add(friendId);
    }

    /**
     * Remove a friend ID from the set of friends.
     * @param {number} friendId - The ID of the friend to remove.
     */
    removeFriend(friendId) {
        this.friend_ids.delete(friendId);
    }

    /**
     * Add an enemy ID to the set of enemies.
     * @param {number} enemyId - The ID of the enemy to add.
     */
    addEnemy(enemyId) {
        this.enemy_ids.add(enemyId);
    }

    /**
     * Remove an enemy ID from the set of enemies.
     * @param {number} enemyId - The ID of the enemy to remove.
     */
    removeEnemy(enemyId) {
        this.enemy_ids.delete(enemyId);
    }
}