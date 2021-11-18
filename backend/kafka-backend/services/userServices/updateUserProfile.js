const User = require('../../../models/userModel')
const kafka = require('../../../kafka/client')
const generateToken = require("../../../utils/generateToken");
const bcrypt = require('bcryptjs')

const handle_request = async (msg, callback) => {

    try{
        const user = await User.findById({'_id': msg._id})
        if(user){
            if(msg.password){
                const salt = await bcrypt.genSalt(10)
                var hashedPassword = await bcrypt.hash(msg.password, salt)
            }
            user.set(
                {
                    firstName: msg.firstName || user.firstName,
                    lastName: msg.lastName || user.lastName,
                    emailId: msg.emailId || user.emailId,
                    password: hashedPassword || user.password,
                    imageUrl: msg.imageUrl || user.imageUrl,
                    contact: msg.contact || user.contact
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