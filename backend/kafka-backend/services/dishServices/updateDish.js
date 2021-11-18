const Dish = require('../../../models/dishModel')
const kafka = require('../../../kafka/client')

const handle_request = async(msg, callback) => {

    const { _id, dishName, description, image, dishCategory, dishType, dishPrice } = msg
    const dish = await Dish.findById({_id: _id})

    try{
        if(dish){
            dish.set({
                dishName: dishName || dish.dishName,
                description: description || dish.description,
                image: image || dish.image,
                dishCategory: dishCategory || dish.dishCategory,
                dishType: dishType || dish.dishType,
                dishPrice: dishPrice || dish.dishPrice
            })

            await dish.save()
            callback(null, dish)
        }
        else{
            const err = {
                "error" : "Unable to update dish!"
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