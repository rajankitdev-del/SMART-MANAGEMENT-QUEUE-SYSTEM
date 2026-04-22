const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const validateRequest = require('../middlewares/validateRequest');
const schemas = require('../validations/schemas');

// Route: Login user
router.post('/login', validateRequest(schemas.userLogin), userController.loginUser);

module.exports = router;
