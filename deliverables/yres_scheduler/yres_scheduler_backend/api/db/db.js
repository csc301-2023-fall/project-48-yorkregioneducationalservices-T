// db.js

const { Pool } = require('pg');
const config = require('config');

const dbConfig = config.get('db');

const client = new Pool({
    host: dbConfig.HOST,
    user: dbConfig.USER,
    port: dbConfig.PORT,
    password: dbConfig.PASSWORD,
    database: dbConfig.DATABASE,
    max: 20, 
    idleTimeoutMillis: 30000,
    connectionTimeoutMillis: 2000
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
        // Promise that resolves when client.connect() succeeds
        const connectPromise = client.connect();

        // Promise that rejects after 5 seconds
        const timeoutPromise = new Promise((_, reject) => {
            setTimeout(() => {
                reject(new Error('Connection timed out after 5 seconds'));
            }, 5000); // Timeout after 5 seconds
        });

        // Race between connectPromise and timeoutPromise
        await Promise.race([connectPromise, timeoutPromise]);

        console.log('Database connected!');
    } catch (error) {
        console.error('Error connecting to database:', error);
    }
};

module.exports = {
    client,
    connectDB,
};
