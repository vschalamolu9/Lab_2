let connection =  require('./kafka/Connection');
const get_all_restaurants = require('./services/restaurantServices/getAllRestaurants')
const get_restaurant_menu = require('./services/restaurantServices/getRestaurantMenu')
const get_dish_details = require('./services/restaurantServices/getDishDetails')
const get_restaurant_details = require('./services/restaurantServices/getRestaurantDetails')
const sign_up_user = require('./services/userServices/signupUser')
const login_user = require('./services/userServices/loginUser')
const login_restaurant = require('./services/restaurantServices/loginRestaurant')
const sign_up_restaurant = require('./services/restaurantServices/signupRestaurant')
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
