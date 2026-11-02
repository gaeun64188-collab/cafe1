const mysql = require('mysql2/promise');

const db = mysql.createPool({
    host: 'localhost',
    user: 'cafe_user',
    password: 'cafe1234',
    database: 'cafe_db',
    waitForConnections: true,
    connectionLimit: 10,
    charset: 'utf8mb4'
});

module.exports = db;
