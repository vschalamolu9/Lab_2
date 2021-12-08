const Restaurant = require("../models/restaurantModel");
const graphql = require("graphql");
const RestaurantType  = require('./TypeDefs/RestaurantType')
const { GraphQLObjectType, GraphQLString, GraphQLSchema, GraphQLList } = graphql
const bcrypt = require('bcryptjs')

const RootQuery = new GraphQLObjectType({
    name: "RootQueryType",
    fields: {
        getAllRestaurants:{
            type: new GraphQLList(RestaurantType),
            args: { _id: { type: GraphQLString }},
            async resolve(parent, args){
                const restaurantsList = await Restaurant.find({})
                return restaurantsList
            }
        }
    }
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
                        const message = "Restaurant already exists";
                        return message;
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
        }
    }
})

module.exports = new GraphQLSchema({query: RootQuery, mutation: Mutation})