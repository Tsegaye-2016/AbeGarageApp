const express = require('express');
const router = express.Router();
const vehicelController = require('../controllers/vehicle.controller');
router.post('/api/vehicel',vehicelController.addVehicles);
router.get('/api/customers/:customer_id', vehicelController.getVehiclesByCustomerId);
router.get('/api/vehicle_serial', vehicelController.getVehicleSerial);
router.put('/api/vehicle/update',vehicelController.updateVehicle);
router.get('/api/vehicle/total_vehicle',vehicelController.countVehicle);
module.exports = router;