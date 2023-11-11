const {Client} = require('pg')

const client = new Client({
    host: 'db',
    user: "summercamp",
    port: 5432,
    password: "csc301",
    database: "summercamp_db"
});

module.exports = client