var db = module.exports = require('mysql').createPool({
    connectionLimit: 5,
    host: '172.24.0.2',
    user: process.env.SQL_USER,
    port: process.env.SQL_PORT,
    password: process.env.SQL_PASSWORD,
    database: process.env.SQL_DB,
    dateStrings: true
});