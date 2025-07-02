// Import express module
const express = require('express');
// call the router method of express to create a  router object
const router = express.Router();
// Import the install router
const installRouter = require('./install.routes');
//import the employee router
const employeeRouter = require('./employee.routes');
//import customer router
const customerRouter = require('./customer.routes');
//import the login router
const loginRouter = require('./login.routes');
// add the install router to the main router
router.use(installRouter);
// add the employee router to the main router
router.use(employeeRouter);
//add the customer router to the main router
router.use(customerRouter);
//add the login router to the main router
router.use(loginRouter);
// Export the router
module.exports = router;