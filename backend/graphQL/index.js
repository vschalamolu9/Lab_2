const Restaurant = require("../models/restaurantModel");
const graphql = require("graphql");
const RestaurantType  = require('./TypeDefs/RestaurantType')
const { GraphQLObjectType, GraphQLString, GraphQLSchema, GraphQLList } = graphql

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
                restaurantType: {type: GraphQLString}
            },
            async resolve(parent, args){
                const restaurant = await Restaurant.create(
                    {
                        restaurantName: args.restaurantName,
                        restaurantEmail: args.restaurantEmail,
                        password: args.password,
                        restaurantType: args.restaurantType
                    }
                )
                return restaurant
            }
        }
    }
})

module.exports = new GraphQLSchema({query: RootQuery, mutation: Mutation})