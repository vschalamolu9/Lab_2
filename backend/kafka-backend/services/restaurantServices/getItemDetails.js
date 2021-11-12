const Item = require('../../../models/itemModel')

const handle_request = async(msg, callback) => {
    try{
        const itemDetails = await Item.findById({_id: msg.id})
        if(itemDetails){
            callback(null, itemDetails)
        }
        else{
            const err = {
                error: "Menu Item Not Found!"
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