const generateToken = require('../../../utils/generateToken')
const User = require('../../../models/userModel')
const kafka = require('../../../kafka/client')

const handle_request = async (msg, callback) => {

    const { emailId, password } = msg
    const user = await User.findOne({emailId: emailId})

    try{
        if(user && (await user.matchPassword(password))){
            const result = {
                _id: user._id,
                firstName: user.firstName,
                lastName: user.lastName,
                emailId: user.emailId,
                address: user.address,
                imageUrl: user.imageUrl,
                token: generateToken(user._id)
            }
            callback(null, result)
        }
        else{
            const err = {
                "error" : "Invalid username/password!"
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