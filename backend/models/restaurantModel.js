const mongoose = require('mongoose')

const restaurantSchema = mongoose.Schema({
    restaurantName:{ type: String, required: true },
    restaurantEmail:{ type: String, required: true, unique: true },
    password:{ type: String,  required: true },
    description:{ type: String, default: '' },
    image:{ type: String, default: '' },
    contact:{ type: String, default: '' },
    city: {type: String, required: true},
    province: {type: String, default: ''},
    country: {type: String, required: true},
    zipCode: {type: String, default: ''},
    deliveryFee: { type: Number, default: 0 },
    workHrsFrom: {type: String, default: ''},
    workHrsTo: {type: String, default: ''},
    rating:{ type: Number, default: 0 },
    numReviews: { type: Number, default: 0 }
}, {
    timestamps: true
})

const Restaurant= mongoose.model('Restaurant', restaurantSchema)

module.exports = Restaurant