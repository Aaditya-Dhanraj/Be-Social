const express = require('express');
const authControllers = require('./../controllers/authcontrollers');
const userControllers = require('./../controllers/userControllers');

const router = express.Router();

//for these four we do not need to log in
router.post('/signup', authControllers.signup);
router.post('/login', authControllers.login);
router.use(authControllers.protect);
router.get('/:id', userControllers.othersProfile);
router.get('/logout', authControllers.logout);

module.exports = router;
