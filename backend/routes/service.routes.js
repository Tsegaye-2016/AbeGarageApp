const express = require('express');
const router = express.Router();
const serviceController = require('../controllers/service.controller');
router.post('/api/service', serviceController.createService);
router.get('/api/services', serviceController.getAllServices);
module.exports = router;