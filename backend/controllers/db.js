// db.js
const mysql = require('mysql');

const db = mysql.createConnection({
    host: "localhost",
    user: "user",
    password: "password",
    database: "to_do_app"
});

db.connect((err) => {
    if (err) {
        console.log("Error connecting to DB");
        console.log("Cause: " + err.cause);
        console.log("Message: " + err.message);
    } else {
        console.log("Successfully connected to DB!");
    }
});

module.exports = db;
