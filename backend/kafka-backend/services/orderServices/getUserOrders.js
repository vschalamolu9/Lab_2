const kafka = require('../../../kafka/client')
const Order = require('../../../models/orderModel')

const handle_request = async(msg, callback)=>{

    try {
        const userOrders = await Order.find({'userId': msg.id})
        if (userOrders) {
            callback(null, userOrders)
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