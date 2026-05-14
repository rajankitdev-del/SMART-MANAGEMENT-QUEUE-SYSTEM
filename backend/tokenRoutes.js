const express = require('express');
const router = express.Router();
const tokenController = require('../controllers/tokenController');

router.post('/create', tokenController.createToken);
router.get('/history', tokenController.getTokenHistory);
router.get('/:tokenId', tokenController.getTokenDetails);
router.get('/:tokenId/status', tokenController.getTokenStatus);
router.get('/:tokenId/notifications', tokenController.getTokenNotifications);
router.post('/:tokenId/priority', tokenController.updatePriority);
router.post('/:tokenId/confirm-service', tokenController.confirmService);

module.exports = router;
