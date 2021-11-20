const Order = require('../models/orderModel')
const asyncHandler = require('express-async-handler')
const kafka = require('../kafka/client')

//@description Add New Order
//@route POST /api/orders/addOrder
//@access Private
const addNewOrder = asyncHandler(async(req, res) => {

    kafka.make_request('add_new_order', req.body, (err, results) => {
        if(err){
            res.status(500).json({
                error: err
            })
        }
        else{
            res.status(201).send(results)
        }
    })

})

//@description Get Order By Id
//@route GET /api/orders/:orderId
//@access Private
const getOrderDetails = asyncHandler(async(req, res) => {

    kafka.make_request('get_order_details', req.params, (err, results) => {
        if(err){
            res.status(500).json({
                error: err
            })
        }
        else{
            res.status(200).send(results)
        }
    })
})

//@description User Orders
//@route GET /api/orders/userOrders/:id
//@access Private
const getUserOrders = asyncHandler(async(req, res) => {
    const pageSize = req.query.pageSize || 2
    const page = req.query.page || 1
    const userId = req.params.id
    kafka.make_request('get_user_orders', {pageSize, page, userId}, (err, results) => {
        if(err){
            res.status(500).json({
                error: err
            })
        }
        else{
            res.status(200).send(results)
        }
    })
})

//@description Restaurant Orders
//@route GET /api/orders/restaurantOrders/:id
//@access Private
const getRestaurantOrders = asyncHandler(async(req, res) => {
    const pageSize = req.query.pageSize || 2
    const page = req.query.page || 1
    const restaurantId = req.params.id
    kafka.make_request('get_restaurant_orders', {pageSize, page, restaurantId}, (err, results) => {
        if(err){
            res.status(500).json({
                error: err
            })
        }
        else{
            res.status(200).send(results)
        }
    })
})

//@description Update Order Status
//@route PUT /api/orders/updateStatus/:id
//@access Private
const updateOrderStatus =asyncHandler(async(req, res) => {
    kafka.make_request('update_order_status', req.body, (err, results) => {
        if(err){
            res.status(500).json({
                error: err
            })
        }
        else{
            res.status(200).send(results)
        }
    })
})



module.exports = { addNewOrder, getOrderDetails, getUserOrders, getRestaurantOrders, updateOrderStatus }