
/** Object getter for Room class.
 * 
 * @param {string} room_id - room UUID.
 * @returns an object of type Room with given room ID, or undefined if not exists.
 */
function getRoomById(room_id) {
    var name, campus_id;
    client.query(`SELECT * FROM yres_db.Room WHERE room_id = '${room_id}';`, function (err, result) {
        if (result.length == 0) {
            return undefined;
        }
        if (err){
            throw Error(err);
        }
        name = result.rows[0].name;
        campus_id = result.rows[0].campus_id;
    });
    return new Room(
        room_id,
        name,
        campus_id);
}

/** Get a list of all Room objects of a given campus.
 * 
 *  @param {string} campus_id - ID of the campus from which to get all rooms.
 *  @returns an array of Room objects with the given campus_id. Empty array is returned if the campus_id does not exist.
 */
function getRoomsByCampusId(campus_id) {
    var all_rooms = new Array();
    client.query(`SELECT * FROM yres_db.Room WHERE campus_id = '${campus_id}';`, function (err, result) {
        if (err) {
            throw Error(err);
        }
        var room_id, name;
        for (var i=0; i<result.length; i++) {
            room_id = result[i].room_id;
            name = result[i].name;
            all_rooms.push(new Room(room_id, name, campus_id));
        }
    });
    return all_rooms;
}

/** Write a Room to database.
 * 
 * @param {string} room_id - room UUID.
 * @param {string} name - room name.
 * @param {string} campus_id - ID of campus this room belongs to.
 * @returns true if written successfully.
 */
function createRoom(room_id, name, campus_id) {
    client.query(`INSERT INTO yres_db.Room(room_id, name, campus_id) VALUES('${room_id, name, campus_id}')`, function (err, result) {
        if (err){
            throw Error(err);
            return false;
        }
    });
    return true;
}

/** Object getter for Admin User class.
 * 
 * @param {string} room_id - room UUID.
 * @returns an object of type Room with given room ID, or undefined if not exists.
 */
function getAdminUserByName(username) {
    var password;
    client.query(`SELECT * FROM yres_db.LoginInfo WHERE username = '${username}';`, function (err, result) {
        if (result.length == 0) {
            return undefined;
        }
        password = result.rows[0].password;
        if (err){
            throw Error(err);
        }
    });
    return new AdminUser(
        username,
        password);
}

/** Write an administrator to the database.
 * 
 * @param {string} username - Must not exist already in the DB.
 * @param {string} password 
 * @returns true if written successfully.
 */
function createAdminUser(username, password) {
    var existing_user = getAdminUserByName(username);
    if (existing_user != undefined)
        return false;
    client.query(`INSERT INTO yres_db.LoginInfo(username, password) VALUES('${username, password}')`, function (err, result) {
        if (err){
            throw Error(err);
            return false;
        }
    });
    return true;
}

/** Check if a pair of username and password is valid.
 * 
 * @param {string} username 
 * @param {string} password 
 * @returns true if the combination is valid.
 */
function checkLogin(username, password) {
    var admin = getAdminUserByName(username);
    if (admin == undefined)
        return false;
    if (password == admin.password)
        return true;
    return false;
}

/** Check if a user exists.
 * 
 * @param {string} username 
 * @returns true if the user exists.
 */
function existsUser(username) {
    var admin = getAdminUserByName(username);
    if (admin == undefined)
        return false;
    return true;
}