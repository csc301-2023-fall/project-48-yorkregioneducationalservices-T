const AdminUser = require("../entities/AdminUser");
const { client } = require('./db');
const bcrypt = require('bcrypt');

/** Gets an AdminUser entitity for a given username from the database.
 * 
 * @param {string} username - username for Admin User
 * @returns an AdminUser entity for username or null if none exists
 */
async function getAdminUserByName(username) {
    var password;
    const query = `SELECT * FROM LoginInfo WHERE username = '${username}';`
    try {
        const result = await client.query(query);

        if (result && result.rowCount > 0) {
            password = result.rows[0].password;
            return new AdminUser(
                username,
                password);
        } else {

            return null;
        }

    } catch (err){
        throw new Error(err);
    }
        
}

/** Writes an AdminUser entity to the database.
 * 
 * @param {string} username - Must not exist already in the DB.
 * @param {string} password 
 * @returns true if written successfully.
 */
async function createAdminUser(username, hashed_password) {
    const query = `INSERT INTO LoginInfo(username, password) VALUES('${username}', '${hashed_password}');`
    try {
        const result = await client.query(query);

        return true;

    } catch (err){
        throw new Error(err);
    }
}

/** Check if a username/password pair is valid for an admin user.
 * 
 * @param {string} username 
 * @param {string} password 
 * @returns true if the combination is valid.
 */
async function checkLogin(username, password) {
    var admin = await getAdminUserByName(username);
    if (admin == null) {
        return false;
    }
    const is_valid =  await bcrypt.compare(password, admin.password);
    return is_valid;
}

/** Check if a user exists.
 * 
 * @param {string} username 
 * @returns true if the user exists.
 */
async function existsUser(username) {
    var admin = await getAdminUserByName(username);
    if (admin == null)
        return false;
    return true;
}

module.exports = {

    checkLogin,
    existsUser,
    createAdminUser,
    getAdminUserByName,
}
