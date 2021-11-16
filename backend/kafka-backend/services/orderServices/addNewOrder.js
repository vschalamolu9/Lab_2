const Order = require('../../../models/orderModel')
const kafka = require('../../../kafka/client')

const handle_request = async (msg, callback) =>{

    const { userId, restaurantId, orderDate, orderType, orderStatus, orderTotal, orderItems, deliveryAddress } = msg

    try{
        const order = await Order.create({
            userId,
            restaurantId,
            orderDate,
            orderType,
            orderStatus,
            orderTotal,
            orderItems,
            deliveryAddress
        })

        if(order){
            const result = {
               _id: order._id,
                userId: order.userId,
                restaurantId: order.restaurantId,
                orderDate: order.orderDate,
                orderType: order.orderType,
                orderStatus: order.orderStatus,
                orderTotal: order.orderTotal,
                orderItems: order.orderItems,
                deliveryAddress: order.deliveryAddress
            }
            callback(null, result)
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