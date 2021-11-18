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
                restaurantType: restaurant.restaurantType,
                imageUrl: restaurant.imageUrl,
                contact: restaurant.contact,
                address: restaurant.address,
                deliveryFee: restaurant.deliveryFee,
                workHrsFrom: restaurant.workHrsFrom,
                workHrsTo: restaurant.workHrsTo,
                rating: restaurant.rating,
                numReviews: restaurant.numReviews,
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
