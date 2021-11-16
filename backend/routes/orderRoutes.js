const express = require('express')
const router = express.Router()
const { addNewOrder } = require('../controllers/orderController')
const protect = require('../middleware/authMiddleWare')

router.route('/addNewOrder').post(addNewOrder)

module.exports = router