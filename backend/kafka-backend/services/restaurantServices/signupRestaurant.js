const kafka = require('../../../kafka/client')
const Restaurant = require('../../../models/restaurantModel')
const bcrypt = require('bcryptjs')

const handle_request = async(msg, callback) => {

    //const { restaurantName, restaurantEmail, password, restaurantType, city, province, country, zipCode, imageUrl, workHrsFrom, workHrsTo } = msg

    const restaurantExists = await Restaurant.findOne({'restaurantEmail': msg.restaurantEmail})

    if(restaurantExists){
        callback('Restaurant already exits', null)
    }
    else{
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(msg.password, salt)

        const restaurantObj = {
            restaurantName : msg.restaurantName,
            restaurantEmail: msg.restaurantEmail,
            password: hashedPassword,
            restaurantType: msg.restaurantType,
            address:{
                street: msg.street,
                city: msg.city,
                province: msg.province,
                country: msg.country,
                zipCode: msg.zipCode
            },
            imageUrl: msg.imageUrl
        }

        const restaurant = await Restaurant.create(restaurantObj)

        if(restaurant){
            const result = {
                _id: restaurant._id,
                restaurantName: restaurant.restaurantName,
                restaurantEmail: restaurant.restaurantEmail,
                restaurantType: restaurant.restaurantType,
                imageUrl: restaurant.imageUrl,
                contact: restaurant.contact,
                address: restaurant.address,
                deliveryFee: restaurant.deliveryFee,
                workHrsFrom: restaurant.workHrsFrom,
                workHrsTo: restaurant.workHrsTo,
                rating: restaurant.rating,
                numReviews: restaurant.numReviews
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