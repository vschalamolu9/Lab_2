const express = require('express')
const router = express.Router()
const { addNewOrder, getOrderDetails, getUserOrders, getRestaurantOrders, updateOrderStatus } = require('../controllers/orderController')
const protect = require('../middleware/authMiddleWare')

router.route('/addNewOrder').post(protect, addNewOrder)

router.route('/:id').get(protect, getOrderDetails)

router.route('/userOrders/:id').get(protect, getUserOrders)

router.route('/restaurantOrders/:id').get(protect, getRestaurantOrders)

router.route('/updateStatus').put(protect, updateOrderStatus)

module.exports = router