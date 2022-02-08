const router = require('express').Router();

const userController = require('../controllers/userController');
const auth = require('../middleware/Auth');

// send all users
router.route('/').get(auth.checkUserAuthentication, userController.sendUsers);

// send current user
router.route('/auth').post(userController.sendCurrentUser);

// register user
router.route('/register').post(userController.registerUser);

// login user
router.route('/login').post(userController.loginUser);

// logout user
router.route('/logout').post(userController.logoutUser);

module.exports = router;
