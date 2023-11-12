
const db = require('../db/psqlDbPlugin');
const User = require('../entities/AdminUser');
const crypto = require('crypto');

function login(username, password) {
    if (!db.checkLogin(username, password)) {
        console.log(username, password);
        return {
            login_status: false,
            message: "Invalid combination of user ID and password"
        };
    }
    else return {
        login_status: true,
        message: "Login successful"
    }

}

function signup(username, password) {
    if (db.existsUser) {
        return {
            signup_status: false,
            userID: "",
            message: "User name exists"
        }
    }
    else {
        const userID = crypto.randomUUID();
        db.newUser(userID, username, password);
        return {
            signup_status: true,
            userID: userID,
            message: "Signup successful"
        }
    }
}

function logout(userID) {
    return {
        login_status: false,
        message: "Loggout successful"
    }
}

module.exports = {
    login,
    signup,
    logout
}