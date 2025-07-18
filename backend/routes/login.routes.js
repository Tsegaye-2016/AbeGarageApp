//import express module
const express = require('express');
//call the router method from express
const router = express.Router();
//import the login controller
const loginController = require('../controllers/login.controller');
//create a route to handle the login request on post method
router.post('/api/employee/login', loginController.login);
//export the router
module.exports = router;