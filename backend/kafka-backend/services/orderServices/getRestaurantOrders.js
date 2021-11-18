const kafka = require('../../../kafka/client')
const Order = require('../../../models/orderModel')

const handle_request = async(msg, callback)=>{

    try {
        const restaurantOrders = await Order.find({'restaurantId': msg.id})
        if (restaurantOrders) {
            callback(null, restaurantOrders)
        }
        else {
            const err = {
                "error":"Orders Not Found!"
            }
            callback( err,null);
        }
    }
    catch (error) {
        console.log(error)
        const err = {
            error:"Internal Server Error"
        }
        callback( err,null);
    }

};

exports.handle_request = handle_request;