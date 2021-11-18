const User = require('../../../models/userModel')
const kafka = require('../../../kafka/client')

const handle_request = async (msg, callback) => {


    try{

        const user = await User.findById({'_id': msg._id})

        if(user){
            user.set(
                {address:
                        {
                            street: msg.street || user.address.street,
                            city: msg.city || user.address.city,
                            state: msg.state || user.address.state,
                            country: msg.country || user.address.country,
                            zipCode: msg.zipCode || user.address.zipCode
                        }
                })
            await user.save()
            callback(null, user)
        }
        else{
            const err = {
                "error" : "Invalid user!"
            }
            callback(err, null)
        }
    }
    catch(error){
        const err = {
            "error" : "Internal Server Error!"
        }
        callback(err, null)
    }
}

exports.handle_request = handle_request;