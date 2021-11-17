const express = require('express')
const router = express.Router()
const { addNewOrder, getOrderDetails } = require('../controllers/orderController')
const protect = require('../middleware/authMiddleWare')

router.route('/addNewOrder').post(addNewOrder)

router.route('/:id').get(getOrderDetails)

module.exports = router