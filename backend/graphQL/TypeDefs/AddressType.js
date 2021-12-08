const graphql = require("graphql");
const { GraphQLObjectType, GraphQLString } = graphql

const AddressType = new GraphQLObjectType({
    name: "Address",
    fields: () => ({
        _id: { type: GraphQLString},
        street: { type: GraphQLString},
        city: { type: GraphQLString},
        state: {type: GraphQLString },
        country: {type: GraphQLString },
        zipCode: {type: GraphQLString }
    })
})

module.exports = AddressType