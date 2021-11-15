const generateToken = require('../../../utils/generateToken')
const kafka = require('../../../kafka/client')
const Restaurant = require('../../../models/restaurantModel')

const handle_request = async (msg, callback) => {

    const { restaurantEmail, password } = msg

    const restaurant = await Restaurant.findOne({restaurantEmail: restaurantEmail})

    try{
        if(restaurant && (await restaurant.matchPassword(password))){
            const result = {
                _id: restaurant._id,
                restaurantName: restaurant.restaurantName,
                restaurantEmail: restaurant.restaurantEmail,
                address: restaurant.address,
                imageUrl: restaurant.imageUrl,
                token: generateToken(restaurant._id)
            }
            callback(null, result)
        }
        else{
            const err = {
                "error" : "Invalid EmailId/Password!"
            }
            callback(err, null)
        }
    }
    catch(error){
        const err = {
            "error" : "Internal Server Error!"
        }
        callback(err, null)
    }
}

exports.handle_request = handle_request
