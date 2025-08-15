const express = require('express');
const router = express.Router();
const appointmentController = require('../controllers/appointment.controllers');

router.post('/api/appointment',appointmentController.createAppointment);
router.get('/api/appointments',appointmentController.getAllAppointment);
router.put('/api/appointment/update',appointmentController.updateAppointment);
module.exports = router;