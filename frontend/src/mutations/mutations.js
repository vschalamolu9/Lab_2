import { gql } from 'apollo-boost'

const createRestaurant = gql`
    mutation createRestaurant(
        $restaurantName: String,
        $restaurantEmail: String,
        $password: String,
        $restaurantType: String,
        $street: String,
        $city: String,
        $state: String,
        $country: String,
        $zipCode: String,
        $imageUrl: String
    ){
        createRestaurant(
            restaurantName: $restaurantName,
            restaurantEmail: $restaurantEmail,
            password: $password,
            restaurantType: $restaurantType,
            street: $street,
            city: $city,
            state: $state,
            country: $country,
            zipCode: $zipCode,
            imageUrl: $imageUrl){
                _id,
                restaurantName,
                restaurantEmail,
                restaurantType,
                address{
                    city
                },
                imageUrl
        }
    }
`;


const createUser = gql`
    mutation createUser(
        $firstName: String,
        $lastName: String,
        $emailId: String,
        $password: String,
        $city: String,
        $state: String,
        $country: String,
        $zipCode: String,
        $imageUrl: String
    ){
        createUser(
            firstName: $firstName,
            lastName: $lastName,
            emailId: $emailId,
            password: $password,
            city: $city,
            state: $state,
            country: $country,
            zipCode: $zipCode,
            imageUrl: $imageUrl
        ){
            _id,
            firstName,
            lastName,
            emailId,
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

const updateOrderStatus = gql`
    mutation updateOrderStatus($_id: String, $orderStatus){
        updateOrderStatus(_id: $_id, orderStatus: $orderStatus){
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
`

const addNewDish = gql`
    mutation addNewDish(
        $restaurantId: String,
        $dishName: String,
        $description: String,
        $image: String,
        $dishCategory: String,
        $dishType: String,
        $dishPrice: Number
    ){
        addNewDish(
            restaurantId: $restaurantId,
            dishName: $dishName,
            description: $description,
            image: $image,
            dishCategory: $dishCategory,
            dishType: $dishType,
            dishPrice: $dishPrice
        ){
            _id,
            restaurantId,
            dishName,
            image,
            dishCategory,
            dishType,
            dishPrice
            
        }
    }
`;

export { addNewDish, updateOrderStatus, createUser, createRestaurant }