const Counselor = require("../entities/Counselor");
const uuid = require('uuid');
const { client } = require('./db');


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
        row.counselor_id,
        row.lastname,
        row.firstname,
        row.campus_id
    );
}


/**
 * Retrieves all counselors belonging to a specific campus.
 * @param {string} campusId - The ID of the campus to retrieve counselors for.
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
    var counselors;
    console.log("dick");
    return new Promise(async (resolve, reject) => {
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
        resolve(counselors)

    });
}


/**
 * Creates a new counselor record in the database.
 * @async
 * @function createCounselor
 * @param {Object} counselor - The counselor object to be created in the database.
 * @param {string} counselor.firstname - The first name of the counselor.
 * @param {string} counselor.lastname - The last name of the counselor.
 * @param {string} counselor.campus_id - The ID of the campus the counselor is associated with.
 * @returns {Promise<boolean>} - A promise that resolves to true if the counselor was created successfully, false otherwise.
 */
async function createCounselor(counselor) {
    const query = `
        INSERT INTO Counselor (counselor_id, firstname, lastname, campus_id)
        VALUES ($1, $2, $3, $4)
        RETURNING counselor_id;
    `;

    try {
        const result = await client.query(query, [
            uuid.v4(), // Assuming counselor_id is a UUID
            counselor.firstname,
            counselor.lastname,
            counselor.campus_id,
        ]);
        return true;
    } catch (error) {
        console.error(error);
        return false;
    }
}


/**
 * Edits a counselor record in the database by ID.
 * @async
 * @function editCounselorById
 * @param {Object} counselor - The counselor object with updated information.
 * @param {string} counselor.firstname - The updated first name of the counselor.
 * @param {string} counselor.lastname - The updated last name of the counselor.
 * @param {string} counselor.counselor_id - The unique ID of the counselor to be updated.
 * @returns {Promise<boolean>} - Returns a promise that resolves to true if the update was successful, false otherwise.
 */
async function editCounselorById(counselor) {
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
            counselor.firstname,
            counselor.lastname,
            counselor.counselor_id,
        ]);

        if (result.rows.length > 0) {
            // The update was successful
            return true;
        } else {
            // No rows affected, update failed
            return false;
        }
    } catch (error) {
        console.error(error);
        return false;
    }
}


/**
 * Deletes a counselor from the database by their ID.
 * @async
 * @function deleteCounselorById
 * @param {string} counselorId - The ID of the counselor to be deleted.
 * @returns {Promise<boolean>} - Returns a Promise that resolves to a boolean indicating whether the counselor was successfully deleted.
 * If the counselor was deleted, the Promise resolves to true. If the counselor was not found, the Promise resolves to false.
 * If an error occurs while deleting the counselor, the Promise rejects with the error.
 */
async function deleteCounselorById(counselorId) {
    const query = `
        DELETE FROM Counselor
        WHERE counselor_id = $1
        RETURNING *;
    `;

    try {
        const result = await client.query(query, [counselorId]);
        const deletedCounselor = result.rows[0];

        if (deletedCounselor === undefined) {
            return false;
        }
        return true;
    } catch (error) {
        console.error(error);
        return false;
    }
}


module.exports = {
    getAllCounselors,
    createCounselor,
    editCounselorById,
    deleteCounselorById
}