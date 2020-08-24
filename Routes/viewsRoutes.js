const express = require('express');
const authControllers = require('../controllers/authcontrollers');
const viewsControllers = require('../controllers/viewsControllers');

const router = express.Router();
router.use(viewsControllers.alerts);

router.get('/signup', authControllers.isLoggedIn);
router.get('/login', authControllers.isLoggedIn);

module.exports = router;
