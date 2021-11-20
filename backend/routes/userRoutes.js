const express = require('express')
const router = express.Router()
const { signupUser, loginUser, updateUserProfile, updateUserAddress } = require('../controllers/userController')
const protect = require('../middleware/authMiddleWare')

router.route('/signup').post(signupUser)

router.route('/login').post(loginUser)

router.route('/updateProfile').put(protect, updateUserProfile)

router.route('/updateAddress').put(protect, updateUserAddress)

module.exports = router