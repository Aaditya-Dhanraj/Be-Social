const express = require('express');
const authControllers = require('../controllers/authcontrollers');
const postControllers = require('../controllers/postControllers');

const router = express.Router();

router.use(authControllers.protect);

router.post('/uploadPost', postControllers.createPost);

router.get('/', postControllers.getAllPosts);

router.get('/myPosts', postControllers.getMyPosts);

router.put('/like', postControllers.like);

router.put('/unLike', postControllers.Unlike);

router.put('/comment', postControllers.comment);

module.exports = router;
