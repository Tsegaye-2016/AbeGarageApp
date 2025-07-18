//import express from "express"
const express = require('express');
//call the router method from express
const router = express.Router();
const authMiddleware = require('../middlewares/auth.middleware');
//import the customer controller
const customerController = require('../controllers/customer.controller');
// create a route to handle the  add customer request on post method
router.post('/api/customer',customerController.createCustomer);
router.get('/api/customers',customerController.getAllCustomres);
router.get('/api/customerss',customerController.getCustomerName);
router.put('/api/customer/update',customerController.updateCustomer);
// export the router
module.exports = router;