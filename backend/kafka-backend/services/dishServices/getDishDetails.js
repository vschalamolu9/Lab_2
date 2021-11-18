const Dish = require('../../../models/dishModel')

const handle_request = async(msg, callback) => {
    try{
        const dishDetails = await Dish.findById({'_id': msg.id})
        if(dishDetails){
            callback(null, dishDetails)
        }
        else{
            const err = {
                error: "Menu Dish Not Found!"
            }
            callback(err, null);
        }
    }
    catch(error){
        console.log(error)
        const err = {
            error: "Internal Server Error"
        }
        callback(err, null)
    }
};

exports.handle_request = handle_request;