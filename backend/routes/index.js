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
//import vehicle router
const vehicleRouter = require('./vehicle.routes');
//import the login router
const loginRouter = require('./login.routes');
//import order router
const orderRouter = require('./order.routes');
//import service router
const serviceRouter = require('./service.routes');
const appointmentRouter = require('./appointment.routes');
router.use(appointmentRouter);
// add the install router to the main router
router.use(installRouter);
// add the employee router to the main router
router.use(employeeRouter);
//add the customer router to the main router
router.use(customerRouter);
//add the vehicle router to the main router
router.use(vehicleRouter);
//add the order router to the main router
router.use(orderRouter);
//add the service router to the main router
router.use(serviceRouter);
//add the login router to the main router
router.use(loginRouter);
// Export the router
module.exports = router;