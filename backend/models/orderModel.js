const mongoose = require('mongoose')
const Schema = mongoose.Schema

const orderSchema = new Schema({
    userId: { type: mongoose.Types.ObjectId, ref: 'User'},
    restaurantId: {type: mongoose.Types.ObjectId, ref: 'Restaurant'},
    orderDate: { type: Date, default: Date.now},
    orderType: {type: String },
    orderStatus: { type: String },
    paymentMethod: {type: String },
    totalPrice: { type: Number, default: 0.00 },
    deliveryPrice: {type: Number, default: 0.00},
    taxPrice: {type: Number, default: 0.00},
    orderItems: [
        {
            product: {type: mongoose.Types.ObjectId, ref: 'Dish'},
            restaurantId: {type: mongoose.Types.ObjectId, ref: 'Restaurant'},
            dishName: { type: String },
            image: {type: String},
            dishPrice: { type: Number, default: 0.00 },
            qty: { type: Number, default: 1 },
        }
    ],
    deliveryAddress: {
        street: {type: String },
        city: {type: String },
        province: { type: String },
        country: {type: String },
        zipCode: {type: String }
    }

},{
    timestamps: true
})

const Order = mongoose.model('Order', orderSchema)
module.exports = Order