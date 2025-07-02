// import express from "express";
const express = require('express');
//call the router method from express
const router = express.Router();
// import employee controller
const employeeController = require('../controllers/employee.controller');
// import the middleware
const authMiddleware = require('../middlewares/auth.middleware');
// create a route to handle the  add employee request on post method
router.post('/api/employee',[authMiddleware.verifyToken,authMiddleware.isAdmin], employeeController.createEmployee);
// create a route to handle the  get all employees request on get method
router.get('/api/employees', [authMiddleware.verifyToken,authMiddleware.isAdmin], employeeController.getAllEmployees);

// export the router
module.exports = router;