const express = require('express')
const router = express.Router()
const { addNewOrder, getOrderDetails, getUserOrders, getRestaurantOrders, updateOrderStatus } = require('../controllers/orderController')
const protect = require('../middleware/authMiddleWare')

router.route('/addNewOrder').post(addNewOrder)

router.route('/:id').get(getOrderDetails)

router.route('/userOrders/:id').get(getUserOrders)

router.route('/restaurantOrders/:id').get(getRestaurantOrders)

router.route('/updateStatus').put(updateOrderStatus)

module.exports = router