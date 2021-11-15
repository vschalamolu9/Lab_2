const kafka = require('../../../kafka/client')
const Restaurant = require('../../../models/restaurantModel')
const bcrypt = require('bcryptjs')

const handle_request = async(msg, callback) => {

    const { restaurantName, restaurantEmail, password, city, province, country, zipCode } = msg

    const restaurantExists = await Restaurant.findOne({restaurantEmail: restaurantEmail})

    if(restaurantExists){
        callback({error: 'Restaurant already exits'}, null)
    }
    else{
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password, salt)

        const restaurant = await Restaurant.create({
            restaurantName,
            restaurantEmail,
            password: hashedPassword,
            address:{
                city: city,
                province: province,
                country: country,
                zipCode: zipCode
            }
        })

        if(restaurant){
            const result = {
                _id: restaurant._id,
                restaurantName: restaurant.restaurantName,
                restaurantEmail: restaurant.restaurantEmail,
                address: restaurant.address,
            }
            callback(null, result)
        }
        else{
            callback('Internal server error!')
        }

    }
    callback('Success!', null)
};

exports.handle_request = handle_request