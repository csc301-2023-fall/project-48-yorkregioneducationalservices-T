/**
 * This module implements DB operations for the counselor service.
 * 
 * @module api/db/counselorDbPlugin
 * 
 * @requires api/entities/Counselor
 * @requires api/db/db
 */
const Counselor = require("../entities/Counselor");
const { client } = require('./db');
const logger = require('../../logger');
const config = require('config');
const CAMPUS_ID = config.get('campus');

///////////////////////////////////////////////////////////////////////////////////
// Counselor db plugin methods
///////////////////////////////////////////////////////////////////////////////////

/**
 * Maps a row from the counselor table to a Counselor object.
 * @param {Object} row - The row from the counselor table.
 * @returns {Counselor} A new Counselor object.
 */
function mapRowToCounselor(row) {
    return new Counselor(
        row.counselor_id.toString(),
        row.lastname,
        row.firstname,
        row.campus_id.toString()
    );
}

/**
 * Retrieves all counselors from DB.
 * 
 * @returns {Array} An array of Counselor objects.
 */
async function getAllCounselors() {
    const query = `
        SELECT
            C.counselor_id,
            C.firstname,
            C.lastname,
            C.campus_id
        FROM
            Counselor C;
    `;
    const functionName = getAllCounselors.name;
    logger.debug(`Function ${functionName}: Getting all counselors from the database.`);
    var counselors;
    try {
        const result = await new Promise((queryResolve, queryReject) => {
            client.query(query, (err, result) => {
                if (err) {
                    queryReject(err);
                } else {
                    queryResolve(result);
                }
            });
        });
        

        // Extract rows from the result
        const rows = result.rows;

        // Map the rows to Student objects
        counselors = rows.map(mapRowToCounselor);
        // Resolve the promise with the students data
        return counselors
    } catch (err) {
        throw new Error(err);
    }
}

/**
 * Creates a new counselor record in the database.
 * 
 * @param {Object} counselor - The counselor object to be created in the database.
 * @param {string} counselor.firstname - The first name of the counselor.
 * @param {string} counselor.lastname - The last name of the counselor.
 * @param {number} counselor.campus_id - The ID of the campus the counselor is associated with.
 * @returns {boolean} - true if the counselor was created successfully
 */
async function createCounselor(firstname, lastname) {
    const query = `
        INSERT INTO Counselor (firstname, lastname, campus_id)
        VALUES ($1, $2, $3)
        RETURNING counselor_id;
    `;
    const functionName = createCounselor.name;
    logger.debug(`Function ${functionName}: Creating a new counselor in the database.`);
    try {
        const result = await client.query(query, [
            firstname,
            lastname,
            CAMPUS_ID
        ]);
        return true;
    } catch (err) {
        throw new Error(err);
    }
}


/**
 * Edits a counselor record in the database by ID.
 * 
 * @param {Object} counselor - The counselor object with updated information.
 * @param {string} counselor.firstname - The updated first name of the counselor.
 * @param {string} counselor.lastname - The updated last name of the counselor.
 * @param {number} counselor.counselor_id - The unique ID of the counselor to be updated.
 * @returns {boolean} - true if the update was successful, false otherwise.
 */
async function editCounselorById(counselor_id, firstname, lastname) {
    const query = `
        UPDATE Counselor
        SET
            firstname = $1,
            lastname = $2
        WHERE
            counselor_id = $3
        RETURNING *;
    `;

    try {
        const result = await client.query(query, [
            firstname,
            lastname,
            counselor_id,
        ]);

        if (result.rows.length > 0) {
            // The update was successful
            return true;
        } else {
            // No rows affected, update failed
            throw new Error("No rows affected by update operation.");
        }
    } catch (err) {
        throw new Error(err);
    }
}


/**
 * Deletes a counselor from the database by their ID.
 * 
 * @param {number} counselorId - The ID of the counselor to be deleted.
 * @returns {boolean} - Boolean indicating whether the counselor was successfully deleted.
 * 
 */
async function deleteCounselorById(counselorId) {
    const query = `
        DELETE FROM Counselor
        WHERE counselor_id = $1
        RETURNING *;
    `;

    try {
        const result = await client.query(query, [counselorId]);

        if (result.rows.length > 0) {
            // The update was successful
            return true;
        } else {
            // No rows affected, update failed
            throw new Error("No rows affected by update operation.");
        }
    } catch (error) {
        throw new Error(err);
    }
}

/**
 * Deletes all Counselors in the database.
 * @async
 * @function deleteAllCounselors
 * @returns {boolean} - Returns a boolean that is true if operation is successful
 */
async function deleteAllCounselors() {

    const query = `DELETE FROM Counselor;`;
    try {
        await client.query(query);
        return true;
    } catch (err){
        throw new Error(err);
    }
}

/**
 * Reset Counselor ID counter in the database.
 * @async
 * @function resetCounselorIds
 * @returns {boolean} - Returns a boolean that is true if operation is successful
 */
async function resetCounselorIds() {

    const query = `ALTER SEQUENCE counselor_counselor_id_seq RESTART WITH 1;`;
    try {
        await client.query(query);
        return true;
    } catch (err){
        throw new Error(err);
    }
}

module.exports = {
    getAllCounselors,
    createCounselor,
    editCounselorById,
    deleteCounselorById,
    deleteAllCounselors,
    resetCounselorIds
}