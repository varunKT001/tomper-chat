const router = require('express').Router();

const userController = require('../controllers/userController');

// send current user
router.post('/auth', userController.sendCurrentUser);

// register user
router.post('/register', userController.registerUser);

// login user
router.post('/login', userController.loginUser);

// logout user
router.post('/logout', userController.logoutUser);

module.exports = router;
