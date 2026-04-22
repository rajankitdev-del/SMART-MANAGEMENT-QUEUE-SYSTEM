const express = require('express');
const router = express.Router();
const tokenController = require('../controllers/tokenController');
const validateRequest = require('../middlewares/validateRequest');
const schemas = require('../validations/schemas');

// Route: Generate a token
router.post('/generate', validateRequest(schemas.tokenGenerate), tokenController.generateToken);

// Route: Get token by ID
router.get('/:id', tokenController.getTokenById);

module.exports = router;
