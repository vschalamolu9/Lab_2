const Restaurant = require('../../../models/restaurantModel')
const kafka = require('../../../kafka/client')

const handle_request = async (msg, callback) => {


    try{
        const restaurant = await Restaurant.findById({'_id': msg._id})

        if(restaurant){
            restaurant.set(
                {address:
                        {
                            street: msg.street || restaurant.address.street,
                            city: msg.city || restaurant.address.city,
                            province: msg.province || restaurant.address.province,
                            country: msg.country || restaurant.address.country,
                            zipCode: msg.zipCode || restaurant.address.zipCode
                        }
                })
            await restaurant.save()
            callback(null, restaurant)
        }
        else{
            callback("Invalid Restaurant", null)
        }
    }
    catch(error){

        callback("Internal Server Error!", null)
    }
}

exports.handle_request = handle_request;