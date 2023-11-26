const Student = require("../entities/Student");
const uuid = require('uuid');
const { client } = require('./db');
const logger = require('../../logger');
const c = require("config");
const e = require("express");


///////////////////////////////////////////////////////////////////////////////////
// Student db plugin methods
///////////////////////////////////////////////////////////////////////////////////


/**
 * Maps a row from the student table to a Student object.
 * @param {Object} row - The row from the student table.
 * @returns {Student} A new Student object.
 */
function mapRowToStudent(row) {
    return new Student(
        row.student_id,
        row.student_ui_id,
        row.lastname,
        row.firstname,
        row.age,
        row.sex,
        row.campus_id,
        new Set(),
        new Set()
    );
}

/**
 * Retrieves friend preferences from the database and categorizes them as either friends or enemies for a given student.
 * @async
 * @function getFriendPreferencesAndCategorize
 * @param {Object} student - The student object for which to retrieve and categorize friend preferences.
 * @param {string} student.student_id - The ID of the student for which to retrieve and categorize friend preferences.
 * @throws {Error} Throws an error if there was an issue fetching friend preferences from the database.
 */
async function getFriendPreferencesAndCategorize(student) {
 
    const queryGetFriendPreferencesAndCategorize = `
        SELECT *
        FROM FriendPreference
        WHERE student_id1 = $1 OR student_id2 = $1;
    `;

    const values = [student.student_id];
    
    try {
        const result = await client.query(queryGetFriendPreferencesAndCategorize, values);

 
        promises = result.rows.map(async (row) => {
            if (row.is_apart) {
                if (row.student_id1 !== student.student_id) {
                    await student.addEnemy(row.student_id1);
                } else {
                    await student.addEnemy(row.student_id2);
                }
            } else {
                if (row.student_id1 !== student.student_id) {
                    await student.addFriend(row.student_id1);
                } else {
                    await student.addFriend(row.student_id2);
                }
            }
        });


        await Promise.all(promises);

    } catch (error) {
        // Handle errors appropriately
        logger.error('Error while fetching friend preferences:', {error: error});
        throw new Error('Failed to fetch friend preferences', error.message);
    }

  }


/**
 * Use this one for now!!!
 * Retrieves all students from the database and maps them to Student objects.
 * @returns {Promise<Array<Student>>} A promise that resolves with an array of Student objects.
 */
async function getAllStudents() {
    const queryGetAllStudents = `
        SELECT
            S.student_id,
            S.student_ui_id,
            S.firstname,
            S.lastname,
            S.campus_id,
            S.age,
            S.sex
        FROM
            Student S;
    `;
    const functionName = getAllStudents.name; // Get the name of the current function for logging purposes
    logger.debug(`Function ${functionName}: Getting all students in the studentDbPlugin`);
    var students;
    return new Promise(async (resolve, reject) => {
        try {
            const result = await new Promise((queryResolve, queryReject) => {
                client.query(queryGetAllStudents, (err, result) => {
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
            students = rows.map(mapRowToStudent);
    
            // Create an array of promises to wait for all students' preferences to be fetched and categorized
            for (const student of students) {
                await getFriendPreferencesAndCategorize(student);
            }
            // Resolve the promise with the students data
            resolve(students);
        } catch (error) {
            logger.error('Error while getting all students:', {error: error});
            return {result: false, error: err.message};
        }
    });
}


/**
 * Retrieves a student from the database by their ID.
 *
 * @param {number} student_id - The ID of the student to retrieve.
 * @returns {Promise<Student>} A Promise that resolves with the retrieved student object.
 * @throws {Error} If there was an error retrieving the student from the database.
 */
async function getStudentById(student_id) {
    const query = `
        SELECT
            S.student_id,
            S.student_ui_id,
            S.firstname,
            S.lastname,
            S.age,
            S.sex
        FROM
            Student S
        WHERE
            S.student_id = $1;
    `;
    const functionName = getStudentById.name; // Get the name of the current function for logging purposes
    logger.debug(`Function ${functionName}: Getting all students in the studentDbPlugin with the studentId: ${student_id}`);
    try {
        const result = client.query(query, [student_id]);
        const row = result.rows[0];
        return mapRowToStudent(row);
    } catch (err) {
        logger.error('Failed to getStudentById', {error: err});
        return {result: false, error: err.message};
    }
}


function getStudentByUiId(student_ui_id) {
    const query = `
        SELECT
            S.student_id,
            S.student_ui_id,
            S.firstname,
            S.lastname,
            S.age,
            S.sex
        FROM
            Student S
        WHERE
            S.student_ui_id, = $1;
    `;
    const functionName = getStudentByUiId.name; // Get the name of the current function for logging purposes
    logger.debug(`Function ${functionName}: Getting all students in the studentDbPlugin with the studentUiId: ${student_ui_id}`);
    try {
        const result = client.query(query, [student_ui_id]);
        const row = result.rows[0];
        return mapRowToStudent(row);
    } catch (err) {
        logger.error('Failed to getStudentByUiId', {error: err});
        return {result: false, error: err.message};
    }
}

async function insertFriendPreferences(student_id, other_student_ui_id, is_apart) {
  
    const result_other_friend = await client.query('SELECT * FROM STUDENT WHERE student_ui_id = $1', [other_student_ui_id,]);
    if (result_other_friend.rows.length !== 0) {
        logger.debug('inserting friend preferences');
        const other_student_id = result_other_friend.rows[0].student_id;
        const queryInsertFriendPreferences = `
            INSERT INTO FriendPreference (student_id1, student_id2, is_apart)
            VALUES ($1, $2, $3)
        `;
        let larger_id, smaller_id;
        if (student_id > other_student_id) {
            larger_id = student_id;
            smaller_id = other_student_id;
            } else {
            larger_id = other_student_id;
            smaller_id = student_id;
            }
        await client.query(queryInsertFriendPreferences, [larger_id, smaller_id, is_apart]);
    } else {
        logger.debug('other student not found');
    }
}

/**
 * Inserts a new student into the database along with their friend and enemy preferences.
 * @async
 * @function createStudent
 * @param {Object} student - The student object to be inserted into the database.
 * @param {string} student.student_ui_id - The unique identifier for the student.
 * @param {string} student.firstname - The first name of the student.
 * @param {string} student.lastname - The last name of the student.
 * @param {number} student.age - The age of the student.
 * @param {string} student.sex - The gender of the student.
 * @param {Array<string>} student.friend_ids - An array of unique identifiers for the student's friends.
 * @param {Array<string>} student.enemy_ids - An array of unique identifiers for the student's enemies.
 * @returns {Promise<boolean>} - A promise that resolves to true if the student was successfully inserted into the database, or false otherwise.
 */
async function createStudent(student) {

    const query = `
        INSERT INTO Student (student_id, student_ui_id, firstname, lastname, age, sex)
        VALUES ($1, $2, $3, $4, $5, $6)
        RETURNING student_id;
    `;
    const functionName = createStudent.name; // Get the name of the current function for logging purposes
    logger.debug(`Function ${functionName}: Creating student in the studentDbPlugin`, { student: student });
    try {
        const result = await client.query(query, [
            uuid.v1(),
            student.student_ui_id,
            student.firstname,
            student.lastname,
            student.age,
            student.sex,
        ]);
        //Insert student friend preferences
        const student_id = result.rows[0].student_id;
        student.friend_ids.split(',').map(s => s.trim()).filter(id => id !== '').forEach(async (friend_ui_id) => {
            insertFriendPreferences(student_id, friend_ui_id, false);
        });
        student.enemy_ids.split(',').map(s => s.trim()).filter(id => id !== '').forEach(async (enemy_ui_id) => {
            insertFriendPreferences(student_id, enemy_ui_id, true)
        });
        return {result: true};
    } catch (err) {
        logger.error('Failed to create student', {error: err});
        return {result: false, error: err.message};
    }
}

async function clearFriendPreferencesById(student_id) {
    const queryDeleteFriendPreferences = `Delete From FriendPreference where student_id1 = $1 or student_id2 = $1;`;  
  
    const values = [student_id];
    try {
        const result = await client.query(queryDeleteFriendPreferences, values);
  
    } catch (error) {
        // Handle errors appropriately
        console.error('Error while deleting FriendPreferences:', {error: error});
        throw new Error('Failed to delete FriendPreferences');
    }
  
  }

/**
 * Edits a student record in the database by ID.
 * @async
 * @function editStudentById
 * @param {Object} student - The student object to be updated.
 * @param {string} student.firstname - The first name of the student.
 * @param {string} student.lastname - The last name of the student.
 * @param {number} student.age - The age of the student.
 * @param {string} student.sex - The sex of the student.
 * @param {string} student.student_ui_id - The unique ID of the student.
 * @returns {Promise<boolean>} - Returns a promise that resolves to true if the update was successful, false otherwise.
 */
async function editStudentById(student) {
    const query = `
        UPDATE Student
        SET
            student_ui_id = $1,
            firstname = $2,
            lastname = $3,
            age = $4,
            sex = $5
        WHERE
            student_id = $6
        RETURNING *;
    `;
    const functionName = editStudentById.name; // Get the name of the current function for logging purposes
    logger.debug(`Function ${functionName}: Editing student in the studentDbPlugin`, { student: student });
    try {
        const result = await client.query(query, [
            student.student_ui_id,
            student.firstname,
            student.lastname,
            student.age,
            student.sex,
            student.student_id
        ]);
        clearFriendPreferencesById(student.student_id);
        //Insert student friend preferences
        const student_id = result.rows[0].student_id;
        student.friend_ids.split(',').map(s => s.trim()).filter(id => id !== '').forEach(async (friend_ui_id) => {
            await insertFriendPreferences(student_id, friend_ui_id, false);
        });
        student.enemy_ids.split(',').map(s => s.trim()).filter(id => id !== '').forEach(async (enemy_ui_id) => {
            await insertFriendPreferences(student_id, enemy_ui_id, true)
        });
        return {result: true};
    } catch (err) {
        logger.error('Failed to edit student', {error: err});
        return {result: false, error: err.message};
    }
}

/**
 * Deletes a student from the database by their UI ID.
 * @async
 * @function deleteStudentById
 * @param {string} student_ui_id - The UI ID of the student to be deleted.
 * @returns {Promise<boolean>} - Returns a Promise that resolves to a boolean indicating whether the student was successfully deleted.
 * If the student was deleted, the Promise resolves to true. If the student was not found, the Promise resolves to false.
 * If an error occurs while deleting the student, the Promise rejects with the error.
 */
async function deleteStudentById(student_ui_id) {
    const query = `
        DELETE FROM Student
        WHERE student_ui_id = $1
        RETURNING *;
    `;
    const functionName = deleteStudentById.name; // Get the name of the current function for logging purposes
    logger.debug(`Function ${functionName}: Deleting student in the studentDbPlugin with the studentUiId: ${student_ui_id}`);
    try {
        const result = await client.query(query, [student_ui_id]);
        const deletedStudent = result.rows[0];

        if (deletedStudent === undefined) {
            logger.debug('Student not found');
            throw new Error('Student not found');
        }
        return {result: true};
    } catch (err) {
        logger.error('Failed to delete student', {error: err});
        return {result: false, error: err.message};
    }
}

module.exports = {
    getAllStudents,
    getStudentById,
    getStudentByUiId,
    createStudent,
    editStudentById,
    insertFriendPreferences,
    deleteStudentById
}
