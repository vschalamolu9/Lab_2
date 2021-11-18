const express = require('express')
const router = express.Router()
const { getAllRestaurants, getRestaurantById, getRestaurantMenuItems, loginRestaurant, signupRestaurant, updateRestaurantProfile, updateRestaurantAddress } =require('../controllers/restaurantController')
const protect = require('../middleware/authMiddleWare')

router.route('/').get(getAllRestaurants)

router.route('/details/:id').get(getRestaurantById)

router.route('/:id').get(getRestaurantMenuItems)

router.route('/login').post(loginRestaurant)

router.route('/signup').post(signupRestaurant)

router.route('/updateProfile').put(updateRestaurantProfile)

router.route('/updateAddress').put(updateRestaurantAddress)

module.exports = router