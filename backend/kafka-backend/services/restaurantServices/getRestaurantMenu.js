const Dish = require('../../../models/dishModel')
const kafka = require('../../../kafka/client')

const handle_request = async(msg, callback) => {

    try{
        const dishes = await Dish.find({restaurantId: msg.id})
        console.log(dishes)
        if(dishes.length !== 0){
            callback(null, dishes)
        }
        else{
            const err = {
                error: "Unable to find menu items!"
            }
            callback(err, null)
        }
    }catch(error){
        console.log(error)
        const err = {
            error: "Internal Server Error"
        }
        callback(err, null)
    }
}

exports.handle_request = handle_request;