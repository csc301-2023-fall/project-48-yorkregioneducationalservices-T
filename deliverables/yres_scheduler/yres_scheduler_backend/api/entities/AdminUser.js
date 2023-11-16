/**
 * Class representing an admin user.
 */
module.exports = class AdminUser {
    /**
     * Create a new user object.
     * 
     * @param {string} username: the unique user name
     * @param {string} password 
     */
    constructor (username, password) {
        this.username = username;
        this.password = password;
    }
}