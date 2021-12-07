const graphql = require("graphql");
const { GraphQLObjectType, GraphQLString } = graphql

const RestaurantType = new GraphQLObjectType({
    name: "Restaurant",
    fields: () => ({
        restaurantName: {type: GraphQLString},
        restaurantEmail: {type: GraphQLString},
        password: {type: GraphQLString},
        restaurantType: {type: GraphQLString}
    })
})

module.exports = RestaurantType