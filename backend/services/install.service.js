//import the query function from the db.config.js file
const conn = require('../config/db.config.js');
//import the fs module to read our SQL file
const fs = require('fs');
// write a function to create the database tables
async function install() {
    // create a variable to hold the path to the SQL file
    const queryfile = __dirname + '/sql/initial-queries.sql';
    console.log(queryfile);

    // Temporary variable used to store all queries. the return value of the query function messages current query
    let queries = [];
    let finalMessage = {};
    let templine = '';
    // read the SQL file
    const lines = fs.readFileSync(queryfile, 'utf-8').split('\n');
    // create a promuise to handle the asynchronous reading of the file and executing the queries in the variable 
    const excuted = await new Promise((resolve, reject)=>{
        // iterate over the all lines 
        lines.forEach((line)=>{
            if (line.trim().startsWith('--') || line.trim() === '') {
                // skip comments and empty lines
                return;
            }
            templine += line;
            if (line.trim().endsWith(';')) {
                // if the line ends with a semicolon, it is a complete query
                // Prepare the individual query
                const sqlQuery = templine.trim();
                // Add the query to the list of queries
                queries.push(sqlQuery);
                templine = ''; // reset the templine for the next query
            }
        });
        resolve("Queries are added to the list");
    });
    // loop through the queries and execute them one by one asynchronously
    for (let i = 0; i < queries.length; i++) {
        try {
            // execute the query
            const result = await conn.query(queries[i]);
            console.log("Table created successfully");
        } catch (error) {
            // if there is an error, add it to the final message
            finalMessage.message = "Not all tables were created successfully";
        }
    }
    // Prepare the final message to return to the controller
    if (!finalMessage.message) {
        finalMessage.message = "All tables were created successfully";
        finalMessage.status = 200;
    } else {
        finalMessage.status = 500;
    }
    // Return the final message
return finalMessage;
}
// export the install function
module.exports = { install };