/**
 * Class representing a student profile.
 */
module.exports = class User {
    /**
     * Create a new user object.
     * 
     * @param {string} userID - The unique ID.
     * @param {string} username
     * @param {string} password 
     */
    constructor (userID, username, password) {
        this.userID = userID;
        this.username = username;
        this.password = password;
    }
}