const Order = require('../../../models/orderModel')
const kafka = require('../../../kafka/client')

const handle_request = async(msg, callback) => {

    try{
        const orderDetails = await Order.findById({_id: msg.id})

        if(orderDetails){
            callback(null, orderDetails)
        }
        else{
            const err = {
                error: "Order Details not found!"
            }
            callback(err, null)
        }
    }
    catch(error){
        console.log(error)
        const err = {
            error: "Internal server error."
        }
        callback(err, null)
    }
};

exports.handle_request = handle_request