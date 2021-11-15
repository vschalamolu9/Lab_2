const asyncHandler = require('express-async-handler')
const kafka = require('../kafka/client')
const Restaurant = require('../models/restaurantModel')

//@description Fetch all Restaurants
//@route GET /api/restaurants
//@access Public
const getAllRestaurants = asyncHandler (async(req, res) => {

    kafka.make_request('get_restaurants', req.body, (err, results) => {
        if (err) {
            res.status(500).json({
                error: err
            })

        }
        else {
            res.status(200).json(results)
        }
    })

})

//@description Fetch Restaurant Details by Id
//@route GET /api/restaurant/details/:id
//@access Public
const getRestaurantById = asyncHandler(async(req, res) => {

    kafka.make_request('restaurant_details', req.params, (err, results)=>{

        if(err){
            res.status(500).json({
                error: err
            })
        }
        else{
            res.status(200).json(results)
        }
    })
})

//@description Fetch all Restaurant Menu Items
//@route GET /api/restaurants/:id
//@access Public
const getRestaurantMenuItems = asyncHandler(async(req, res) => {

    kafka.make_request('get_restaurant_menu', req.params, (err, results) => {
        if(err){
            res.status(500).json({
                error: err
            })
        }
        else{
            console.log(results)
            res.status(200).json(results)
        }
    })
})

//@description Restaurant SignUp
//@route POST /api/restaurants/signup
//@access Public
const signupRestaurant = asyncHandler(async(req, res) => {
    kafka.make_request('restaurant_signup', req.body, (err, results) => {
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

//@description Restaurant SignUp
//@route POST /api/restaurants/login
//@access Public
const loginRestaurant = asyncHandler(async(req, res) => {
    kafka.make_request('restaurant_login', req.body, (err, results) => {
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


module.exports = { getAllRestaurants, getRestaurantById, getRestaurantMenuItems, signupRestaurant, loginRestaurant}