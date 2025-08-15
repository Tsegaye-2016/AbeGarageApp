// import express from "express";
const express = require('express');
//call the router method from express
const router = express.Router();
// import employee controller
const employeeController = require('../controllers/employee.controller');
// import the middleware
const authMiddleware = require('../middlewares/auth.middleware');
const { route } = require('./order.routes');
// create a route to handle the  add employee request on post method
router.post('/api/employee',[authMiddleware.verifyToken,authMiddleware.isAdmin], employeeController.createEmployee);
// create a route to handle the  get all employees request on get method
router.get('/api/employees', [authMiddleware.verifyToken,authMiddleware.isAdmin], employeeController.getAllEmployees);
router.get('/api/employeess', employeeController.getEmployeeName);
router.put('/api/employee/update',employeeController.updateEmployee);
router.get('/api/employee/total_employees',employeeController.getTotalEmployee);
// export the router
module.exports = router;