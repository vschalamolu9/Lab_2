const asyncHandler = require('express-async-handler')
const kafka = require('../kafka/client')

//description Fetch Dish
//@route GET /api/item/:id
//@access Public
const getDishById = asyncHandler (async(req, res) => {

    kafka.make_request('get_dish_details', req.params, (err, results) => {
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

//description Add New Dish
//@route POST /api/dishes/addDish
//@access Private
const addNewDish = asyncHandler (async(req, res) => {

    kafka.make_request('add_new_dish', req.params, (err, results) => {
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

//description Update Dish
//@route PUT /api/dishes/updateDish
//@access Private
const updateDish = asyncHandler (async(req, res) => {

    kafka.make_request('update_dish', req.body, (err, results) => {
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

//description Update Dish
//@route PUT /api/dishes/updateDish
//@access Private
const deleteDish = asyncHandler (async(req, res) => {

    kafka.make_request('delete_dish', req.params, (err, results) => {
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

module.exports = { getDishById, addNewDish, updateDish, deleteDish }