const bcrypt = require('bcryptjs')
const User = require('../../../models/userModel')
const kafka = require('../../../kafka/client')

const handle_request = async(msg, callback) => {

    const { firstName, lastName, emailId, password, city, state, country, zipCode, imageUrl } = msg

    const userExists = await User.findOne({emailId: emailId})

    if(userExists){
        callback({error: 'User already exists'}, null)
    }
    else{
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password, salt)

        const newUser = {
            firstName: firstName,
            lastName: lastName,
            emailId: emailId,
            password: hashedPassword,
            address: {
                city: city,
                state: state,
                country: country,
                zipCode: zipCode
            },
            imageUrl: imageUrl
        }

        const user = await User.create(newUser)

        if(user){
            const result = {
                _id: user._id,
                firstName: user.firstName,
                lastName: user.lastName,
                emailId: user.emailId,
                address:user.address,
                imageUrl: user.imageUrl
            }

            callback(null, result)
        }
        else{
            callback('Internal Server Error!', null)
        }
    }
    callback('Success!', null)
};

exports.handle_request = handle_request