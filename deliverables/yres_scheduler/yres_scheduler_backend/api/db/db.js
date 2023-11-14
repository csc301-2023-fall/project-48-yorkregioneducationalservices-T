// db.js

const { Client } = require('pg');
const config = require('config');

const dbConfig = config.get('db');

const client = new Client({
    host: dbConfig.HOST,
    user: dbConfig.USER,
    port: dbConfig.PORT,
    password: dbConfig.PASSWORD,
    database: dbConfig.DATABASE,
});

/**
 * Connects to the database using the client object.
 * @async
 * @function connectDB
 * @returns {Promise<void>} - A Promise that resolves when the database is connected.
 * @throws {Error} - If there is an error connecting to the database.
 */
const connectDB = async () => {
    try {
        await client.connect();
        console.log('Database connected!');
    } catch (error) {
        console.error('Error connecting to database:', error);
    }
};

module.exports = {
    client,
    connectDB,
};
