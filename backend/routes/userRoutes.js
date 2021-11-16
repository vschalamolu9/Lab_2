const express = require('express')
const router = express.Router()
const { signupUser, loginUser } = require('../controllers/userController')
const protect = require('../middleware/authMiddleWare')

router.route('/signup').post(signupUser)

router.route('/login').post(loginUser)

module.exports = router