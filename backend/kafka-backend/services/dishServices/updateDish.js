const Dish = require('../../../models/dishModel')
const kafka = require('../../../kafka/client')

const handle_request = async(msg, callback) => {


    try{
        const dish = await Dish.findById({'_id': _id})

        if(dish){
            dish.set({
                dishName: msg.dishName || dish.dishName,
                description: msg.description || dish.description,
                image: msg.image || dish.image,
                dishCategory: msg.dishCategory || dish.dishCategory,
                dishType: msg.dishType || dish.dishType,
                dishPrice: msg.dishPrice || dish.dishPrice
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