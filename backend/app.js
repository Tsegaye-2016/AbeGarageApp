// import the express module
const express = require('express');
// import the dotenv module and call the config method to load the environment variables
require('dotenv').config();
//import the sanitize module
const sanitize = require('sanitize');
//import the CORS module
const cors = require('cors');
// create a variable to hold the port number
const port = process.env.PORT;
// import the router
const router = require('./routes');
// create the web server
const app = express();
//set up cors options to allow the requests from the frontend
const corsOptions = {
    origin:process.env.FRONTEND_URL,
    optionsSuccessStatus:200
}
// add the cors middleware to the application
app.use(cors(corsOptions));
//add the express.json middleware to the application
app.use(express.json());
//add the sanitize middleware to the middleware
app.use(sanitize.middleware);
// add the routes to the application as middleware
app.use(router);
// start the web server and listen on the port
app.listen(port, ()=>{
    console.log(`Server is running on port ${port}`);
});
// export the web server so that it can be used in other files
module.exports = app;