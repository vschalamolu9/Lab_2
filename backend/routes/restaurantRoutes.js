const express = require('express')
const Restaurant = require('../models/restaurantModel')
const Item = require('../models/itemModel')
const asyncHandler = require('express-async-handler')
const router = express.Router()
const kafka = require('../kafka/client')


//@description Fetch all Restaurants
//@route GET /api/restaurants
//@access Public
router.get('/', asyncHandler(async (req, res) => {
    //const restaurants = await Restaurant.find({})
    //res.json(restaurants)
    kafka.make_request('get_restaurants', req.body, (err, results) => {
        if (err) {
            res.status(500).json({
                error: err
            })

        }
        else {
            console.log(results)
            res.status(201).json(results)
        }
    })
}))


/*//@description Fetch all Restaurants
//@route GET /api/restaurants/:id
//@access Public
router.get('/:id', asyncHandler(async (req, res) => {
    const restaurant = await Restaurant.findById(req.params.id)
    if(restaurant){
        res.json(restaurant)
    }else{
        res.status(404)
        throw new Error('Product not found')
    }

}))
 */

//@description Fetch all Restaurant Menu Items
//@route GET /api/restaurant/:id
//@access Public
router.get('/:id', asyncHandler(async(req, res) => {
    const menuItems = await Item.find({restaurant: req.params.id})
    res.json(menuItems)
}))

module.exports = router