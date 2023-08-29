var express = require('express');
var router = express.Router();
const userController = require('../controllers/user.controller');
const authMiddleware = require('../middlewares/authentification.middleware');

/* GET users listing. */
router.get('/', userController.me);
router.get('/me', authMiddleware.validToken, userController.me);

module.exports = router;