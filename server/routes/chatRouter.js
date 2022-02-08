const router = require('express').Router();

const chatController = require('../controllers/chatController');
const auth = require('../middleware/Auth');

// send chat(s)
router
  .route('/')
  .post(auth.checkUserAuthentication, chatController.sendSingleChat)
  .get(auth.checkUserAuthentication, chatController.sendAllChats);

// // create new group chat
router
  .route('/group')
  .post(auth.checkUserAuthentication, chatController.createGroupChat);

// // rename existing group chat
router
  .route('/grouprename')
  .post(auth.checkUserAuthentication, chatController.renameGroup);

//  add person to group chat
router
  .route('/groupadd')
  .post(auth.checkUserAuthentication, chatController.addToGroup);

// // remove person from group chat
router
  .route('/groupremove')
  .post(auth.checkUserAuthentication, chatController.removeFromGroup);

module.exports = router;
