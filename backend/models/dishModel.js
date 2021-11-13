const mongoose = require('mongoose')

const dishSchema = mongoose.Schema({
    restaurantId: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'Restaurant' },
    dishName:{ type: String, required: true },
    description:{ type: String, required: true },
    image:{ type: String, required: true },
    dishCategory:{ type: String, required: true },
    dishType: { type: String, required: true },
    dishPrice:{ type: Number, required: true },
    dishReview: { type: Number },
    numReviews: { type: Number }
}, {
    timestamps: true
})

const Dish= mongoose.model('Dish', dishSchema)

module.exports = Dish