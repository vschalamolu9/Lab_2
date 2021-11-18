const Dish = require('../../../models/dishModel')
const kafka = require('../../../kafka/client')

const handle_request = async(msg, callback) => {

    try{

        await Dish.findOneAndRemove({_id: msg.id}, function(err, data){
            if(!err){
                callback(null, data)
            }
            else{
                callback(err, null)
            }
        })

        callback(null, 'Dish Removed successfully!')
    }
    catch(error){
        callback("Internal Server error!", null)
    }
};

exports.handle_request = handle_request