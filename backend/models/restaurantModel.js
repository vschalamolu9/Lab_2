const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')
const Schema = mongoose.Schema

const restaurantSchema = new Schema({
    restaurantName:{ type: String },
    restaurantEmail:{ type: String, unique: true },
    restaurantType: {type: String },
    password:{ type: String },
    description:{ type: String },
    imageUrl:{ type: String },
    contact:{ type: String },
    address: {
        street: {type: String },
        city: {type: String },
        province: {type: String },
        country: {type: String },
        zipCode: {type: String }
    },
    deliveryFee: { type: Number, default: 0 },
    workHrsFrom: {type: String, default: '10:00:00'},
    workHrsTo: {type: String, default: '21:00:00'},
    rating:{ type: Number, default: 4 },
    numReviews: { type: Number, default: 5 }
}, {
    timestamps: true
})

restaurantSchema.methods.matchPassword = async function(enteredPassword){
    return await bcrypt.compare(enteredPassword, this.password)
}

const Restaurant= mongoose.model('Restaurant', restaurantSchema)
module.exports = Restaurant