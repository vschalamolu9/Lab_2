const asyncHandler = require('express-async-handler')
const kafka = require('../kafka/client')

//description Fetch Item
//@route GET /api/item/:id
//@access Public
const getMenuItemById = asyncHandler (async(req, res) => {

    kafka.make_request('get_item_details', req.params, (err, results) => {
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

module.exports = { getMenuItemById }