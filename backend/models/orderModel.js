const mongoose = require('mongoose')

const orderSchema = mongoose.Schema({
    customer: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Customer'
    },
    orderItems: [
        {
            restaurant: {
                type: mongoose.Schema.Types.ObjectId,
                required: true,
                ref: 'Restaurant'
            },
            items: [
                {
                    item: {
                        type: mongoose.Schema.Types.ObjectId,
                        required: true,
                        ref: 'Item'
                    },
                    quantity: {
                        type: Number,
                        required: true,
                        default: 1
                    }
                }
            ]

        }
    ],
    deliveryAddress: {
        address: { type: String, required: true},
        city: { type: String, required: true},
        zipCode: { type: String, required: true},
        country: { type: String, required: true}
    },
    paymentMethod: {
        type: String,
        required: true
    },
    paymentResult: {
        type: String,
        required: true
    },
    taxPrice: {
        type: Number,
        required: true
    },
    deliveryPrice: {
        type: Number,
        required: true
    },
    totalPrice: {
        type: Number,
        required: true
    },
    isPaid: {
        type: Boolean,
        required: true
    },
    paidAt: {
        type: Date
    },
    isDelivered: {
        type: Boolean,
        required: true,
        default: false
    },
    deliveredAt: {
        type: Date
    }
})

const Order= mongoose.model('Order', orderSchema)

module.exports = Order