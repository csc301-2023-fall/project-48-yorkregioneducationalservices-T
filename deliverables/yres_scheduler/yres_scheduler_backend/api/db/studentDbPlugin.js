/**
 * This module implements the DB operations for the student service.
 * 
 * @module api/db/studentDbPlugin
 * 
 * @requires api/entities/Student
 * @requires api/entities/Block
 * @requires api/db/db
 */
const Student = require("../entities/Student");
const { client } = require('./db');
const logger = require('../../logger');
const c = require("config");
const e = require("express");
const CAMPUS_ID = c.get('campus');


///////////////////////////////////////////////////////////////////////////////////
// Student db plugin methods
///////////////////////////////////////////////////////////////////////////////////

/**
 * Maps a row from the student table to a Student object.
 * 
 * @param {Object} row - The row from the student table.
 * @returns {Student} A new Student object.
 */
function mapRowToStudent(row) {
    return new Student(
        row.student_id.toString(),
        row.student_ui_id.toString(),
        row.lastname,
        row.firstname,
        row.age.toString(),
        row.sex,
        row.campus_id.toString(),
        new Set(),
        new Set()
    );
}

/**
 * Retrieves friend preferences from the database and categorizes them as either friends or enemies for a given student.
 * 
 * @param {Object} student - The student object for which to retrieve and categorize friend preferences.
 * @param {number} student.student_id - The ID of the student for which to retrieve and categorize friend preferences.
 * @return {Student} The updated student entity
 */
async function getFriendPreferencesAndCategorize(student) {
 
    const query = `
        SELECT *
        FROM FriendPreference
        WHERE student_id1 = $1 OR student_id2 = $1;
    `;

    const values = [student.student_id];
    try {
        const result = await client.query(query, values);
        promises = result.rows.map(async (row) => {
            if (row.is_apart) {
                if (row.student_id1 !== parseInt(student.student_id)) {
                    await student.addEnemy(row.student_id1.toString());
                } else {
                    await student.addEnemy(row.student_id2.toString());
                }
            } else {
                if (row.student_id1 !== parseInt(student.student_id)) {
                    await student.addFriend(row.student_id1.toString());
                } else {
                    await student.addFriend(row.student_id2.toString());
                }
            }
        });


        await Promise.all(promises);
        return student;

    } catch (err) {
        throw new Error(err);
    }

  }


/**
 * Retrieves all students from the database and maps them to Student objects.
 * 
 * @returns {Array<Student>} An array of Student objects.
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
    try {
        const result = await client.query(queryGetAllStudents);

        if (result && result.rowCount > 0) {
            const rows = result.rows;
    
            students = rows.map(mapRowToStudent);
    
            for (var i=0; i<students.length; i++) {
                students[i] = await getFriendPreferencesAndCategorize(students[i]);
            }

            return students;
        } else {
            return [];
        }
    } catch (err) {
        throw new Error(err);
    }
}

/**
 * Retrieves a student from the database by their ID.
 *
 * @param {number} student_id - The ID of the student to retrieve.
 * @returns {Student} The retrieved student object.
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
        const result = await client.query(query, [student_id]);
        if (result && result.rowCount > 0) {
            const row = result.rows[0];
            return mapRowToStudent(row);
        } else {
            return null;
        }
    } catch (err) {
        throw new Error(err);
    }
}

/**
 * Retrieves a student from the database by their UI ID.
 *
 * @param {number} student_id - The ID of the student to retrieve.
 * @returns {Student} The retrieved student object.
 */
async function getStudentByUiId(student_ui_id) {
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
        const result = await client.query(query, [student_ui_id]);
        if (result && result.rowCount > 0) {
            const row = result.rows[0];
            return mapRowToStudent(row);
        } else {
            return null;
        }
        
    } catch (err) {
        throw new Error(err);
    }
}

/**
 * Insert new friend preferences.
 *
 * @param {number} student_id - The ID of first student.
 * @param {number} other_student_ui_id - The ID of second student .
 * @param {boolean} is_apart Whether student's are apart or not
 * @returns true if DB operation is successful
 */
async function insertFriendPreferences(student_id, other_student_ui_id, is_apart) {
    
    try {
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
                console.log(larger_id);
                console.log(smaller_id);
                console.log("next");
            await client.query(queryInsertFriendPreferences, [larger_id, parseInt(smaller_id), is_apart]);
            return true;
        } else {
            throw new Error("Student not found");
        }

    } catch(err) {
        throw new Error(err);
    }
    
}

/**
 * Inserts a new student into the database along with their friend and enemy preferences.
 * 
 * @param {Object} student - The student object to be inserted into the database.
 * @param {string} student_ui_id - The unique identifier for the student.
 * @param {string} firstname - The first name of the student.
 * @param {string} lastname - The last name of the student.
 * @param {number} age - The age of the student.
 * @param {string} sex - The gender of the student.
 * @param {Array<string>} friend_ids - An array of unique identifiers for the student's friends.
 * @param {Array<string>} enemy_ids - An array of unique identifiers for the student's enemies.
 * @returns {boolean} - true if the student was successfully inserted into the database, or false otherwise.
 */
async function createStudent(
    student_ui_id,
    firstname,
    lastname,
    age,
    sex,
    friend_ids,
    enemy_ids
) {

    const query = `
        INSERT INTO Student (student_ui_id, firstname, lastname, age, sex, campus_id)
        VALUES ($1, $2, $3, $4, $5, $6)
        RETURNING student_id;
    `;

    const functionName = createStudent.name; // Get the name of the current function for logging purposes
    logger.debug(`Function ${functionName}: Creating student in the studentDbPlugin`, { student_ui_id });
    
    try {
        const result = await client.query(query, [
            student_ui_id,
            firstname,
            lastname,
            age,
            sex,
            CAMPUS_ID
        ]);
        //Insert student friend preferences
        const student_id = parseInt(result.rows[0].student_id);
        friend_ids.split(',').map(s => s.trim()).filter(id => id !== '').forEach(async (friend_ui_id) => {
            await insertFriendPreferences(student_id, friend_ui_id, false);
        });
        enemy_ids.split(',').map(s => s.trim()).filter(id => id !== '').forEach(async (enemy_ui_id) => {
        });
        return true;
    } catch (err) {
        throw new Error(err);
    }
}

/**
 * Delete all friend preferences for a given student ID.
 * 
 * @param {Object} student_id The student ID for 
 * @returns {boolean} - true if the student was successfully inserted into the database, or false otherwise.
 */
async function clearFriendPreferencesById(student_id) {
    const queryDeleteFriendPreferences = `Delete From FriendPreference where student_id1 = $1 or student_id2 = $1;`;  
  
    const values = [student_id];
    try {
        const result = await client.query(queryDeleteFriendPreferences, values);
        return true;
  
    } catch (err) {
        throw new Error(err);
    }
  
  }

/**
 * Edits a student record in the database by ID.
 * 
 * @param {Object} student - The student object to be updated.
 * @param {string} firstname - The first name of the student.
 * @param {string} lastname - The last name of the student.
 * @param {number} age - The age of the student.
 * @param {string} sex - The sex of the student.
 * @param {string} student_ui_id - The unique ID of the student.
 * @returns {boolean} - true if the update was successful
 */
async function editStudentById(
    student_id,
    student_ui_id,
    firstname,
    lastname,
    age,
    sex,
    friend_ids,
    enemy_ids) {
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
    logger.debug(`Function ${functionName}: Editing student in the studentDbPlugin`, { student_id });
    try {
        const result = await client.query(query, [
            student_ui_id,
            firstname,
            lastname,
            age,
            sex,
            student_id,
        ]);
       await clearFriendPreferencesById(student_id);
        //Insert student friend preferences
        const student_id_a = parseInt(result.rows[0].student_id);
        friend_ids.split(',').map(s => s.trim()).filter(id => id !== '').forEach(async (friend_ui_id) => {
            await insertFriendPreferences(student_id_a, friend_ui_id, false);
        });
        enemy_ids.split(',').map(s => s.trim()).filter(id => id !== '').forEach(async (enemy_ui_id) => {
        });
        return true;
    } catch (err) {
        throw new Error(err);
    }
}

/**
 * Deletes a student from the database by their UI ID.
 * 
 * @param {string} student_ui_id - The UI ID of the student to be deleted.
 * @returns {boolean} - boolean indicating whether the student was successfully deleted.
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
        return true;
    } catch (err) {
        throw new Error(err);
    }
}

/**
 * Deletes all Students in the database.
 * @async
 * @function deleteAllStudents
 * @returns {boolean} - Returns a boolean that is true if operation is successful
 */
async function deleteAllStudents() {

    const query = `DELETE FROM Student;`;
    try {
        await client.query(query);
        return true;
    } catch (err){
        throw new Error(err);
    }
}

/**
 * Reset Student ID counter in the database.
 * @async
 * @function resetStudentIds
 * @returns {boolean} - Returns a boolean that is true if operation is successful
 */
async function resetStudentIds() {

    const query = `ALTER SEQUENCE student_student_id_seq RESTART WITH 1;`;
    try {
        await client.query(query);
        return true;
    } catch (err){
        throw new Error(err);
    }
}

module.exports = {
    getAllStudents,
    getStudentById,
    getStudentByUiId,
    createStudent,
    editStudentById,
    insertFriendPreferences,
    deleteStudentById,
    deleteAllStudents,
    resetStudentIds
}
