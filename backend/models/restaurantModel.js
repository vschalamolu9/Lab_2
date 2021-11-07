const mongoose = require('mongoose')

const restaurantSchema = mongoose.Schema({
    restaurantName:{
        type: String,
        required: true
    },
    restaurantEmail:{
        type: String,
        required: true,
        unique: true
    },
    password:{
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
    contact:{
        type: String,
        required: true
    },
    location:{
        type: String,
        required: true
    },
    deliveryFee: {
        type: Number,
        default: 0
    },
    rating:{
        type: Number,
        default: 0
    },
    numReviews: {
        type: Number,
        default: 0
    }
}, {
    timestamps: true
})

const Restaurant= mongoose.model('Restaurant', restaurantSchema)

module.exports = Restaurant