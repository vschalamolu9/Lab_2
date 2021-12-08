const graphql = require("graphql");
const { GraphQLObjectType, GraphQLString, GraphQLInt } = graphql
const Restaurant = require('../../models/restaurantModel')
const AddressType = require('../TypeDefs/AddressType')


const RestaurantType = new GraphQLObjectType({
    name: "Restaurant",
    fields: () => ({
        _id: {type: GraphQLString},
        restaurantName: {type: GraphQLString},
        restaurantEmail: {type: GraphQLString},
        restaurantType: {type: GraphQLString},
        password: {type: GraphQLString},
        description: { type: GraphQLString},
        imageUrl: { type: GraphQLString},
        contact: {type: GraphQLString},
        address: { type: AddressType,
            async resolve(parent, args){
                const rest = await Restaurant.findById({_id: parent._id})
                return rest.address
            }
        },
        deliveryFee: { type: GraphQLInt },
        workHrsFrom: {type: GraphQLString },
        workHrsTo: {type: GraphQLString },
        rating:{ type: GraphQLInt },
        numReviews: { type: GraphQLInt },
        token: { type: GraphQLString }
    })
})

module.exports =  RestaurantType