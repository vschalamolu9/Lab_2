const Restaurant = require('../../../models/restaurantModel')
const kafka = require('../../../kafka/client')
const bcrypt = require('bcryptjs')

const handle_request = async (msg, callback) => {

    //const { _id, restaurantName, restaurantEmail, restaurantType, password, description, imageUrl, contact, deliveryFee, workHrsFrom, workHrsTo } = msg

    try{

        const restaurant = await Restaurant.findById({'_id': msg._id})

        if(restaurant){

            if(msg.password){
                const salt = await bcrypt.genSalt(10)
                var hashedPassword = await bcrypt.hash(msg.password, salt)
            }

            restaurant.set(
                {
                    restaurantName: msg.restaurantName || restaurant.restaurantName,
                    restaurantEmail: msg.restaurantEmail || restaurant.restaurantEmail,
                    restaurantType: msg.restaurantType || restaurant.restaurantType,
                    password: hashedPassword || restaurant.password,
                    description: msg.description || restaurant.description,
                    imageUrl: msg.imageUrl || restaurant.imageUrl,
                    contact: msg.contact || restaurant.contact,
                    deliveryFee: msg.deliveryFee || restaurant.deliveryFee,
                    workHrsFrom: msg.workHrsFrom || restaurant.workHrsFrom,
                    workHrsTo: msg.workHrsTo || restaurant.workHrsTo
                })
            await restaurant.save()
            callback(null, restaurant)
        }
        else{
            const err = {
                "error" : "Invalid Restaurant!"
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