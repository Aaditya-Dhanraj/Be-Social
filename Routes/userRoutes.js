const express = require('express');
const authControllers = require('./../controllers/authcontrollers');

const router = express.Router();

//for these four we do not need to log in
router.post('/signup', authControllers.signup);
router.post('/login', authControllers.login);
router.get('/logout', authControllers.logout);

module.exports = router;
