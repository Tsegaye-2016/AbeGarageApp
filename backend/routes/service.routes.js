const express = require('express');
const router = express.Router();
const serviceController = require('../controllers/service.controller');
router.post('/api/service', serviceController.createService);
router.get('/api/services', serviceController.getAllServices);
router.put('/api/service/update',serviceController.updateService);
router.post('/api/service/delete',serviceController.deleteService);
module.exports = router;