const Dish = require('../../../models/dishModel')
const kafka = require('../../../kafka/client')

const handle_request = async(msg, callback) => {

    const { restaurantId, dishName, description, image, dishCategory, dishType, dishPrice } = msg

    try{
        const newDish = await Dish.create({
            restaurantId, dishName, description, image, dishCategory, dishType, dishPrice
        })

        if(newDish){
            callback(null, newDish)
        }
        else{
            const err = {
                "error" : "Unable to create new dish."
            }
            callback(err, null)
        }
    }
    catch(error){
        const err = {
            "error" : "Internal Server error!"
        }
        callback(err, null)
    }
};

exports.handle_request = handle_request