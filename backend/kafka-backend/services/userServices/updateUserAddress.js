const User = require('../../../models/userModel')
const kafka = require('../../../kafka/client')

const handle_request = async (msg, callback) => {

    const { _id, street, city, state, country, zipCode } = msg
    const user = await User.findById({_id: _id})


    try{
        if(user){
            user.set(
                {address:
                        {
                            street: street || user.address.street,
                            city: city || user.address.city,
                            state: state || user.address.state,
                            country: country || user.address.country,
                            zipCode: zipCode || user.address.zipCode
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