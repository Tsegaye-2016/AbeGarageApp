//import the mysql module promise wrapper
const mysql = require('mysql2/promise');
// prepare connection parameters we use to connect to the database
const dbConfig = {
    connectionLimit: 10,
    password:process.env.DB_PASS,
    user:process.env.DB_USER,
    host:process.env.DB_HOST,
    database:process.env.DB_NAME,
}
// create the connection pool
const pool = mysql.createPool(dbConfig);
// prepare a function that will exectute the SQL queries asyncronously
async function query(sql, params) {
    const [result] = await pool.query(sql, params);
    return result;
}
// export the query function
module.exports = { query };