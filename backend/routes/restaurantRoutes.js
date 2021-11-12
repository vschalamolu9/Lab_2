const express = require('express')
const router = express.Router()
const { getAllRestaurants, getRestaurantById, getRestaurantMenuItems } =require('../controllers/restaurantController')

router.route('/').get(getAllRestaurants)

router.route('/details/:id').get(getRestaurantById)

router.route('/:id').get(getRestaurantMenuItems)

module.exports = router