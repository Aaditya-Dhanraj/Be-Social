const express = require('express');
const authControllers = require('../controllers/authcontrollers');
const postControllers = require('../controllers/postControllers');

const router = express.Router();

router.use(authControllers.protect);

router.patch(
  '/uploadPost',
  postControllers.uploadUserPhoto,
  postControllers.resizeUserPhoto,
  postControllers.createPost
);

router.get('/', authControllers.protect,postControllers.getAllPosts);

router.route('/:id').get(authControllers.protect, postControllers.getMyPosts);

module.exports = router;
