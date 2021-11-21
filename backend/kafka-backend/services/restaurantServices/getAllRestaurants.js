const kafka = require('../../../kafka/client')
const Restaurant = require('../../../models/restaurantModel')

const handle_request = async(msg, callback)=>{

    try {
        const keyword = msg.keyWord
            ? {
                name: {
                    $regex: msg.keyword,
                    $options: 'i',
                },
            }
            : {}

        const filterRestaurants = await Restaurant.find({'restaurantType': msg.filterOption})

        const searchRestaurants = await Restaurant.find({...keyword})

        const restaurants = msg.filterOption!=='' ? filterRestaurants
            : msg.keyword !== '' ? searchRestaurants
                : (msg.filterOption === '' && msg.keyWord === '') ? await Restaurant.find({})
                    : await Restaurant.find({$or:[{'restaurantType': msg.filterOption},{...keyword}]})

        if (restaurants) {
            callback(null,restaurants)
        }
        else {
            const err = {
                "error":"Restaurants Not Found!"
            }
            callback( err,null);
        }
    }
    catch (error) {
        console.log(error)
        const err = {
            error:"Internal Server Error"
        }
        callback( err,null);
    }

};

exports.handle_request = handle_request;