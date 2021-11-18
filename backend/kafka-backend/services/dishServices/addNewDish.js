const Dish = require('../../../models/dishModel')
const kafka = require('../../../kafka/client')

const handle_request = async(msg, callback) => {

    try{

        const newDish = {
            restaurantId: msg.restaurantId,
            dishName: msg.dishName,
            description: msg.description,
            image: msg.image,
            dishCategory: msg.dishCategory,
            dishType: msg.dishType,
            dishPrice: msg.dishPrice
        }

        const dish = await Dish.create(newDish)

        if(dish){
            callback(null, dish)
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