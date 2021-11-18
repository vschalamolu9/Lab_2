const Dish = require('../../../models/dishModel')
const kafka = require('../../../kafka/client')

const handle_request = async(msg, callback) => {

    try{
        await Dish.remove({'_id': msg.id}, () => {callback(null, "Dish removed successfully from menu.")})
    }
    catch(error){
        callback("Internal Server error!", null)
    }
};

exports.handle_request = handle_request