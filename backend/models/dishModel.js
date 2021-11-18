const mongoose = require('mongoose')

const dishSchema = mongoose.Schema({
    restaurantId: { type: mongoose.Schema.Types.ObjectId, ref: 'Restaurant' },
    dishName:{ type: String },
    description:{ type: String },
    image:{ type: String },
    dishCategory:{ type: String },
    dishType: { type: String },
    dishPrice:{ type: Number, default: 4.99 },
    dishReview: { type: Number, default: 4 },
    numReviews: { type: Number, default: 5 }
}, {
    timestamps: true
})

const Dish= mongoose.model('Dish', dishSchema)
module.exports = Dish