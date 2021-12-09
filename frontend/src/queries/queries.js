import { gql } from 'apollo-boost'

const getAllRestaurants = gql`
    query getAllRestaurants{
        getAllRestaurants{
            _id,
            restaurantName,
            restaurantEmail,
            restaurantType,
            imageUrl,
            contact,
            address,
            deliveryFee,
            workHrsFrom,
            workHrsTo,
            rating,
            numReviews      
        }
    }
`;

const getRestaurantDishes = gql`
    query getRestaurantDishes($restaurantId: String){
        getRestaurantDishes(restaurantId: $restaurantId){
            _id,
            restaurantId,
            dishName,
            description,
            image,
            dishCategory,
            dishType,
            dishPrice,
            dishReview,
            numReviews
        }
    }
`;

const getRestaurantDetails = gql`
    query getRestaurantDetails($restaurantId: String){
        getRestaurantDetails(restaurantId: $restaurantId){
            _id,
            restaurantName,
            restaurantEmail,
            restaurantType,
            imageUrl,
            contact,
            address,
            deliveryFee,
            workHrsFrom,
            workHrsTo,
            rating,
            numReviews
        }
    }
`;

const getDishDetails = gql`
    query getDishDetails($_id: String){
        getDishDetails(_id: $_id){
            _id,
            restaurantId,
            dishName,
            description,
            image,
            dishCategory,
            dishType,
            dishPrice,
            dishReview,
            numReviews
        }
    }
`;

const getUserDetails = gql`
    query getUserDetails($_id: String){
        getUserDetails(_id: $_id){
            _id,
            firstName,
            lastName,
            emailId,
            password,
            contact,
            address{
                street,
                city,
                state,
                country,
                zipCode
            },
            imageUrl
        }
    }
`;

const getOrderDetails = gql`
    query getOrderDetails($_id: String){
        getOrderDetails(_id: $_id){
            _id,
            userId,
            restaurantId,
            orderDate,
            orderType,
            orderStatus,
            paymentMethod,
            totalPrice,
            deliveryPrice,
            taxPrice,
            orderItems{
                product,
                restaurantId,
                dishName,
                image,
                dishPrice,
                qty,
            },    
            deliveryAddress{
                street,
                city,
                state,
                country,
                zipCode
            },
            instructions
    }
`;

const getRestaurantOrders = gql`
    query getRestaurantOrders($restaurantId: String){
        getRestaurantOrders(restaurantId: $restaurantId){
            _id,
            userId,
            restaurantId,
            orderDate,
            orderType,
            orderStatus,
            paymentMethod,
            totalPrice,
            deliveryPrice,
            taxPrice,
            orderItems{
                product,
                restaurantId,
                dishName,
                image,
                dishPrice,
                qty,
            },    
            deliveryAddress{
                street,
                city,
                state,
                country,
                zipCode
            },
            instructions
        }
    }
`;

const getUserOrders = gql`
    query getUserOrders($userId: String){
        getUserOrders(userId: $userId){
            _id,
            userId,
            restaurantId,
            orderDate,
            orderType,
            orderStatus,
            paymentMethod,
            totalPrice,
            deliveryPrice,
            taxPrice,
            orderItems{
                product,
                restaurantId,
                dishName,
                image,
                dishPrice,
                qty,
            },    
            deliveryAddress{
                street,
                city,
                state,
                country,
                zipCode
            },
            instructions
        }
    }
`;

const loginUser =  gql`
    query loginUser($emailId: String, $password: String){
        loginUser(emailId: $emailId, password: $password){
            _id,
            firstName,
            lastName,
            emailId,
            password,
            contact,
            address{
                street,
                city,
                state,
                country,
                zipCode
            },
            imageUrl,
            token
        }
    }
`;

const loginRestaurant = gql`
    query loginRestaurant($emailId: String, $password: String){
        loginRestaurant(emailId: $emailId, password: $password){
            _id: restaurant._id,
            restaurantName,
            restaurantEmail,
            restaurantType,
            imageUrl,
            contact,
            address{
                street,
                city,
                state,
                country,
                zipCode
            },
            deliveryFee,
            workHrsFrom,
            workHrsTo,
            rating,
            numReviews,
            token
        }
    }
`;

export { getAllRestaurants, getRestaurantDishes, getRestaurantDetails, getRestaurantOrders, getUserOrders, getUserDetails, getDishDetails, loginUser, loginRestaurant, getOrderDetails }