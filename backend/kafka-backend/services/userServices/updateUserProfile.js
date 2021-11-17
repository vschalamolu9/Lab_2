const User = require('../../../models/userModel')
const kafka = require('../../../kafka/client')
const generateToken = require("../../../utils/generateToken");
const bcrypt = require('bcryptjs')

const handle_request = async (msg, callback) => {

    const { _id, firstName, lastName, emailId, password, contact, imageUrl } = msg
    const user = await User.findById({_id: _id})

    try{
        if(user){
            const salt = await bcrypt.genSalt(10)
            const hashedPassword = await bcrypt.hash(password, salt)
            user.set(
                {
                    firstName: firstName || user.firstName,
                    lastName: lastName || user.lastName,
                    emailId: emailId || user.emailId,
                    password: hashedPassword || user.password,
                    imageUrl: imageUrl || user.imageUrl,
                    contact: contact || user.contact
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