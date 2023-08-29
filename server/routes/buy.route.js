const express = require('express');
const router = express.Router();
const authMiddleware = require('../middlewares/authentification.middleware');

// import controller for buy
const buyController = require('../controllers/buy.controller');

router.get('/', authMiddleware.validToken ,buyController.getBoughtItems); // Getting all items that we bought

router.put('/:itemId', authMiddleware.validToken ,buyController.buy);

module.exports = router;
