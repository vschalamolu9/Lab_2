const express = require('express')
const Item = require('../models/itemModel')
const asyncHandler = require('express-async-handler')
const router = express.Router()
const kafka = require('../kafka/client')

//description Fetch Item
//@route GET /api/item/:id
//@access Public
router.get('/:id', asyncHandler(async(req, res) => {
    /*const menuItem = await Item.findById({_id: req.params.id})
    if(menuItem){
        res.json(menuItem)
    }else{
        res.status(404)
        throw new Error('Menu Item not found')
    }*/

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
}))

module.exports = router