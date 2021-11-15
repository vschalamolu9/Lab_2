const express = require('express')
const router = express.Router()
const { getAllRestaurants, getRestaurantById, getRestaurantMenuItems, loginRestaurant, signupRestaurant } =require('../controllers/restaurantController')

router.route('/').get(getAllRestaurants)

router.route('/details/:id').get(getRestaurantById)

router.route('/:id').get(getRestaurantMenuItems)

router.route('/login').post(loginRestaurant)

router.route('/signup').post(signupRestaurant)

module.exports = router