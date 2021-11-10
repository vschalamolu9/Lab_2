const kafka = require('../../../kafka/client')
const Restaurant = require('../../../models/restaurantModel')

const handle_request = async(msg, callback)=>{

    try {
        const restaurants = await Restaurant.find({})
        if (restaurants) {
            callback(null,restaurants)
        }
        else {
            const err = {
                "error":"Restaurants Not Found!"
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