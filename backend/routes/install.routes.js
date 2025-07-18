// import the express module
const express = require('express');
// call the router method
const router = express.Router();

// import the install controller
const installController = require('../controllers/install.controller');

// create a route for the install endpoint
router.get('/install', installController.install);

// export the router
module.exports = router;