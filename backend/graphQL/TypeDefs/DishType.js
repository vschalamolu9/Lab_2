const graphql = require("graphql");
const { GraphQLObjectType, GraphQLString, GraphQLInt, GraphQLFloat } = graphql
const RestaurantType = require('./RestaurantType')


const DishType = new GraphQLObjectType({
    name: "Dish",
    fields: () => ({
        _id: { type: GraphQLString },
        restaurantId: { type: GraphQLString },
        dishName: { type: GraphQLString },
        description: { type: GraphQLString },
        image: { type: GraphQLString },
        dishCategory: { type: GraphQLString },
        dishType: { type: GraphQLString },
        dishPrice: { type: GraphQLFloat },
        dishReview: { type: GraphQLInt },
        numReviews: { type: GraphQLInt }
    })
})

module.exports = DishType