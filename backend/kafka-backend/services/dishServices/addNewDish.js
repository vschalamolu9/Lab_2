const Dish = require('../../../models/dishModel')
const kafka = require('../../../kafka/client')

const handle_request = async(msg, callback) => {

    try{

        const dish = {
            restaurantId: msg.restaurantId,
            dishName: msg.dishName,
            description: msg.description,
            image: msg.image,
            dishCategory: msg.dishCategory,
            dishType: msg.dishType,
            dishPrice: msg.dishPrice
        }

        const newDish = await Dish.create(dish)

        if(newDish){
            const result = {
                _id: newDish._id,
                restaurantId: newDish.restaurantId,
                dishName: newDish.dishName,
                description: newDish.description,
                image: newDish.image,
                dishCategory: newDish.dishCategory,
                dishType: newDish.dishType,
                dishPrice: newDish.dishPrice
            }
            callback(null, result)
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