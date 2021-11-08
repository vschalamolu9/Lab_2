const express = require('express')
const Item = require('../models/itemModel')
const asyncHandler = require('express-async-handler')
const router = express.Router()

//description Fetch Item
//@route GET /api/item/:id
//@access Public
router.get('/:id', asyncHandler(async(req, res) => {
    const menuItem = await Item.findById({_id: req.params.id})
    if(menuItem){
        res.json(menuItem)
    }else{
        res.status(404)
        throw new Error('Menu Item not found')
    }
}))

module.exports = router