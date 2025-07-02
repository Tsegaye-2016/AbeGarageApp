//import express from "express"
const express = require('express');
//call the router method from express
const router = express.Router();
//import the customer controller
const customerController = require('../controllers/customer.controller');
// create a route to handle the  add customer request on post method
router.post('/api/customer', customerController.createCustomer);
// export the router
module.exports = router;