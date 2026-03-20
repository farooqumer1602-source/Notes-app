const express = require('express');
const { register, login, me } = require('../controller/Usercontroller');
const Protect = require('../middleware/auth');
const router = express.Router()

router.post('/register',register)
router.post('/login',login)
router.get('/me',Protect,me)




module.exports = router