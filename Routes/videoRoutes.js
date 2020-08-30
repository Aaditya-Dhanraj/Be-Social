const express = require('express');
const authControllers = require('../controllers/authcontrollers');
// const userControllers = require('../controllers/userControllers');
const videoControllers = require('../controllers/videoControllers');
const router = express.Router();
router.use(authControllers.protect);
router.get('/chat', videoControllers.createRoom);
router.get('/chat/:room', videoControllers.videoChat);

module.exports = router;
