const graphql = require("graphql");
const { GraphQLObjectType, GraphQLString, GraphQLList } = graphql
const User = require('../../models/userModel')
const AddressType = require('../TypeDefs/AddressType')


const UserType = new GraphQLObjectType({
    name: "User",
    fields: () => ({
        _id: { type: GraphQLString},
        firstName: { type: GraphQLString },
        lastName: { type: GraphQLString },
        emailId: { type: GraphQLString },
        password: { type: GraphQLString },
        contact: { type: GraphQLString },
        address: { type: AddressType,
            async resolve(parent, args){
                const user = await User.findById({_id: parent._id})
                return user.address
            }
        },
        imageUrl: { type: GraphQLString},
        token: {type: GraphQLString}
    })
})

module.exports = UserType