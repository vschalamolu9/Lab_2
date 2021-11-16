const mongoose = require('mongoose')
const Schema = mongoose.Schema

const orderSchema = new Schema({
    userId: { type: mongoose.Types.ObjectId, ref: 'User'},
    restaurantId: {type: mongoose.Types.ObjectId, ref: 'Restaurant'},
    orderDate: { type: Date, default: Date.now},
    orderType: {type: String, required: true},
    orderStatus: { type: String, required: true},
    orderTotal: { type: Number, required: true},
    orderItems: [
        {
            product: {type: mongoose.Types.ObjectId, ref: 'Dish'},
            dishName: { type: String },
            image: {type: String},
            dishPrice: { type: Number },
            restaurantId: {type: mongoose.Types.ObjectId, ref: 'Restaurant'},
            qty: { type: Number},
        }
    ],
    deliveryAddress: {
        street: {type: String, default: ''},
        city: {type: String, required: true},
        province: { type: String, required: true},
        country: {type: String, required: true},
        zipCode: {type: String, default: true}
    }

},{
    timestamps: true
})

const Order = mongoose.model('Order', orderSchema)
module.exports = Order