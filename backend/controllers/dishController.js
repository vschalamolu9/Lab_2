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

module.exports = { getDishById }