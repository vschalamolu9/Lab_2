const Restaurant = require("../models/restaurantModel");
const User = require("../models/userModel")
const graphql = require("graphql");
const RestaurantType  = require('./TypeDefs/RestaurantType')
const UserType = require('./TypeDefs/UserType')
const { GraphQLObjectType, GraphQLString, GraphQLSchema, GraphQLList, GraphQLError } = graphql
const bcrypt = require('bcryptjs')
const generateToken = require('../utils/generateToken')

const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {

        getAllRestaurants:{
            type: new GraphQLList(RestaurantType),
            args: { _id: { type: GraphQLString }},
            async resolve(parent, args){
                const restaurantsList = await Restaurant.find({})
                return restaurantsList
            }
        },

        getUserDetails: {
            type: UserType,
            args: { _id: {type: GraphQLString }},
            async resolve(parent, args){
                const userObj = await User.findOne({_id: args._id})
                return userObj
            }
        },

        loginUser: {
            type: UserType,
            args: {
                emailId: { type: GraphQLString },
                password: { type: GraphQLString}
            },
            async resolve(parent, args){
                const user = await User.findOne({emailId: args.emailId})
                if(user && user.matchPassword(args.password)){
                    const result = {
                        _id: user._id,
                        firstName: user.firstName,
                        lastName: user.lastName,
                        emailId: user.emailId,
                        contact: user.contact,
                        address: user.address,
                        imageUrl: user.imageUrl,
                        token: generateToken(user._id)
                    }

                    return result
                }
                else{
                    return new GraphQLError("User not exists!!")
                }
            }
        },

        loginRestaurant: {
            type: RestaurantType,
            args: {
                emailId: { type: GraphQLString },
                password: { type: GraphQLString }
            },
            async resolve(parent, args){
                const restaurant = await Restaurant.findOne({restaurantEmail: args.emailId})
                if(restaurant && restaurant.matchPassword(args.password)){
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
                        numReviews: restaurant.numReviews,
                        token: generateToken(restaurant._id)
                    }

                    return result
                }
                else{
                    return new GraphQLError("Restaurant not exists!!")
                }
            }
        }
    },
})

const Mutation = new GraphQLObjectType({
    name: "Mutation",
    fields: {
        createRestaurant: {
            type: RestaurantType,
            args: {
                restaurantName: { type: GraphQLString},
                restaurantEmail: {type: GraphQLString},
                password: {type: GraphQLString},
                restaurantType: {type: GraphQLString},
                street: { type: GraphQLString},
                city: { type: GraphQLString},
                province: { type: GraphQLString},
                country: { type: GraphQLString},
                zipCode: { type: GraphQLString},
                imageUrl: { type: GraphQLString}
            },
            async resolve(parent, args){
                try{
                    const restaurantExists = await Restaurant.findOne({restaurantEmail: args.restaurantEmail})
                    if(restaurantExists){
                        return new GraphQLError("Email Already Exists")
                    }
                    else{
                        const salt = await bcrypt.genSalt(10)
                        const hashedPassword = await bcrypt.hash(args.password, salt)
                        const restaurantObj = {
                            restaurantName : args.restaurantName,
                            restaurantEmail: args.restaurantEmail,
                            password: hashedPassword,
                            restaurantType: args.restaurantType,
                            address:{
                                street: args.street,
                                city: args.city,
                                province: args.province,
                                country: args.country,
                                zipCode: args.zipCode
                            },
                            imageUrl: args.imageUrl
                        }

                        const newRestaurant = await Restaurant.create(restaurantObj)

                        return newRestaurant
                    }
                }
                catch(error){
                    return error
                }
            }
        },

        createUser: {
            type: UserType,
            args: {
                firstName: { type: GraphQLString},
                lastName: { type: GraphQLString},
                emailId: { type: GraphQLString},
                password: { type: GraphQLString},
                city: { type: GraphQLString},
                state: { type: GraphQLString},
                country: { type: GraphQLString},
                zipCode: { type: GraphQLString},
                imageUrl: { type: GraphQLString}
            },
            async resolve(parent, args){
                const userExists = await User.findOne({emailId: args.emailId})
                if(userExists){
                    return new GraphQLError("User already Exists")
                }
                else{
                    const salt = await bcrypt.genSalt(10)
                    const hashedPassword = await bcrypt.hash(args.password, salt)
                    const newUserObj = {
                        firstName: args.firstName,
                        lastName: args.lastName,
                        emailId: args.emailId,
                        password: hashedPassword,
                        address: {
                            city: args.city,
                            state: args.state,
                            country: args.country,
                            zipCode: args.zipCode
                        },
                        imageUrl: args.imageUrl
                    }

                    const newUser = await User.create(newUserObj);

                    return newUser
                }
            }
        }
    }
})

module.exports = new GraphQLSchema({query: RootQuery, mutation: Mutation})