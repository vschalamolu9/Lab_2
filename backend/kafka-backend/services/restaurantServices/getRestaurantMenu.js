const Item = require('../../../models/itemModel')
const kafka = require('../../../kafka/client')

const handle_request = async(msg, callback) => {

    try{
        const menuItems = await Item.find({restaurant: msg.id})
        console.log(menuItems)
        if(menuItems.length !== 0){
            callback(null, menuItems)
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