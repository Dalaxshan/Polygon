const express = require('express');
const { register, login, updateUser } = require('../controllers/authController');
const auth = require('../middleware/auth');
const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.put('/me', auth, updateUser);

module.exports = router;