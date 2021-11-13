const express = require('express')
const router = express.Router()
const { getAllRestaurants, getRestaurantById, getRestaurantMenuItems, addNewRestaurant } =require('../controllers/restaurantController')

router.route('/').get(getAllRestaurants)

router.route('/details/:id').get(getRestaurantById)

router.route('/:id').get(getRestaurantMenuItems)

router.route('/register').post(addNewRestaurant)

module.exports = router