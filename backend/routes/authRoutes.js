const express = require('express');
const { signup, login } = require('../controllers/authController');
const router = express.Router();

router.post('/signup', signup); // create admin (first signup open; later requires admin token)
router.post('/login', login);

module.exports = router;
