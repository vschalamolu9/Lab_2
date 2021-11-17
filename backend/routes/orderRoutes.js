const express = require('express')
const router = express.Router()
const { addNewOrder, getOrderDetails, getUserOrders, getRestaurantOrders } = require('../controllers/orderController')
const protect = require('../middleware/authMiddleWare')

router.route('/addNewOrder').post(addNewOrder)

router.route('/:id').get(getOrderDetails)

router.route('/userOrders/:id').get(getUserOrders)

router.route('/restaurantOrders/:id').get(getRestaurantOrders)

module.exports = router