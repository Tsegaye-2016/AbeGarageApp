const express = require('express');
const router = express.Router();
const orderController = require('../controllers/order.controller');
router.post('/api/order', orderController.createOrder);
router.get('/api/orders', orderController.getAllOrders);
router.get('/api/orders/total_orders',orderController.getTotalOrders);
module.exports = router;