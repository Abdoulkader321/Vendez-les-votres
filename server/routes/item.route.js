const express = require('express');
const router = express.Router();
const authMiddleware = require('../middlewares/authentification.middleware');

// import controller for item
const itemController = require('../controllers/item.controller');

router.get('/others', authMiddleware.validToken, itemController.getItemsOfOther);
router.get('/me', authMiddleware.validToken, itemController.getMyItems);
router.post('/', authMiddleware.validToken, itemController.create);
router.get('/delete', authMiddleware.validToken, itemController.delete);
module.exports = router;