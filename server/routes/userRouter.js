const router = require('express').Router();

const userController = require('../controllers/userController');

// register user
router.post('/register', userController.registerUser);

// login user
router.post('/login', userController.loginUser);

module.exports = router;
