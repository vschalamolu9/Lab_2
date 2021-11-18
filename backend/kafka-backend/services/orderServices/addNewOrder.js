const Order = require('../../../models/orderModel')
const kafka = require('../../../kafka/client')

const handle_request = async (msg, callback) =>{


    try{
        const newOrder = {
            userId : msg.userId,
            restaurantId : msg.restaurantId,
            orderDate: msg.orderDate,
            orderType: msg.orderType,
            orderStatus: msg.orderStatus,
            paymentMethod: msg.paymentMethod,
            totalPrice: msg.totalPrice,
            deliveryPrice: msg.deliveryPrice,
            taxPrice: msg.taxPrice,
            orderItems: msg.orderItems,
            deliveryAddress: msg.deliveryAddress
        }

        const order = await Order.create(newOrder)
        console.log(order)

        if(order){
            callback(null, order)
        }
        else{
            callback('Order Failed!', null)
        }


    }
    catch(error){
        const err = {
            "error" : "Internal Server Error!"
        }
        callback(err, null)
    }
}

exports.handle_request = handle_request;