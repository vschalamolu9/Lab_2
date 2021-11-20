const kafka = require('../../../kafka/client')
const Restaurant = require('../../../models/restaurantModel')

const handle_request = async(msg, callback)=>{

    try {
        const pageSize = 2
        const page = Number(msg.pageNumber) || 1
        const count = await Restaurant.countDocuments({})
        const restaurants = await Restaurant.find({}).limit(pageSize).skip(pageSize * (page-1))
        if (restaurants) {
            const result = {
                restaurants: restaurants, page: page, pages: Math.ceil(count/pageSize)
            }

            callback(null,result)
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