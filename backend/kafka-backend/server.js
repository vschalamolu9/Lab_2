let connection =  require('./kafka/Connection');
const get_all_restaurants = require('./services/restaurantServices/getAllRestaurants')
const get_restaurant_menu = require('./services/restaurantServices/getRestaurantMenu')
const get_dish_details = require('./services/dishServices/getDishDetails')
const add_new_dish = require('./services/dishServices/addNewDish')
const update_dish = require('./services/dishServices/updateDish')
const delete_dish = require('./services/dishServices/deleteDish')
const get_restaurant_details = require('./services/restaurantServices/getRestaurantDetails')
const sign_up_user = require('./services/userServices/signupUser')
const login_user = require('./services/userServices/loginUser')
const login_restaurant = require('./services/restaurantServices/loginRestaurant')
const sign_up_restaurant = require('./services/restaurantServices/signupRestaurant')
const add_new_order = require('./services/orderServices/addNewOrder')
const get_order_details = require('./services/orderServices/getOrderDetails')
const update_user_profile = require('./services/userServices/updateUserProfile')
const update_user_address = require('./services/userServices/updateUserAddress')
const get_user_orders = require('./services/orderServices/getUserOrders')
const get_restaurant_orders = require('./services/orderServices/getRestaurantOrders')
const update_order_status = require('./services/orderServices/updateOrderStatus')
const update_restaurant_profile = require('./services/restaurantServices/updateRestaurantProfile')
const update_restaurant_address = require('./services/restaurantServices/updateRestaurantAddress')
const colors = require('colors')
const connectDB = require('../config/db');
connectDB()

function handleTopicRequest(topic_name,fname){
    //var topic_name = 'root_topic';
    let consumer = connection.getConsumer(topic_name);
    let producer = connection.getProducer();
    console.log('server is running ');
    consumer.on('message', function (message) {
        console.log('message received for ' + topic_name +" ", fname);
        console.log(JSON.stringify(message.value));
        let data = JSON.parse(message.value);
        
        fname.handle_request(data.data, function(err,res){
            console.log('after handle'+res);
            let payloads = [
                { topic: data.replyTo,
                    messages:JSON.stringify({
                        correlationId:data.correlationId,
                        data : res
                    }),
                    partition : 0
                }
            ];
            producer.send(payloads, function(err, data){
                console.log(data);
            });
            return;
        });
        
    });
}
// Add your TOPICs here
//first argument is topic name
//second argument is a function that will handle this topic request
handleTopicRequest('get_restaurants', get_all_restaurants)
handleTopicRequest('get_restaurant_menu', get_restaurant_menu)
handleTopicRequest('get_dish_details', get_dish_details)
handleTopicRequest('restaurant_details', get_restaurant_details)
handleTopicRequest('user_signup', sign_up_user)
handleTopicRequest('user_login', login_user)
handleTopicRequest('restaurant_signup', sign_up_restaurant)
handleTopicRequest('restaurant_login', login_restaurant)
handleTopicRequest('add_new_order', add_new_order)
handleTopicRequest('get_order_details', get_order_details)
handleTopicRequest('update_user_profile', update_user_profile)
handleTopicRequest('update_user_address', update_user_address)
handleTopicRequest('get_user_orders', get_user_orders)
handleTopicRequest('get_restaurant_orders',get_restaurant_orders)
handleTopicRequest('update_order_status', update_order_status)
handleTopicRequest('update_restaurant_profile',update_restaurant_profile)
handleTopicRequest('update_restaurant_address', update_restaurant_address)
handleTopicRequest('add_new_dish', add_new_dish)
handleTopicRequest('delete_dish', delete_dish)
handleTopicRequest('update_dish', update_dish)
