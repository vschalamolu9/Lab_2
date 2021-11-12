const Restaurant = require('../../../models/restaurantModel')

const handle_request = async(msg, callback) => {

    try{
        const restaurantDetails = await Restaurant.findById({_id: msg.id})
        if(restaurantDetails){
            callback(null, restaurantDetails)
        }
        else{
            const err = {
                error: "Restaurant not found!"
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