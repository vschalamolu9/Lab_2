const mongoose = require('mongoose')

const itemSchema = mongoose.Schema({
    restaurant: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Restaurant'
    },
    itemName:{
        type: String,
        required: true
    },
    description:{
        type: String,
        required: true
    },
    image:{
        type: String,
        required: true
    },
    category:{
        type: String,
        required: true
    },
    itemType: {
        type: String,
        required: true
    },
    itemPrice:{
        type: Number,
        required: true
    },
    itemReview: {
        type: Number
    },
    numReviews: {
        type: Number
    }
}, {
    timestamps: true
})

const Item= mongoose.model('Item', itemSchema)

module.exports = Item