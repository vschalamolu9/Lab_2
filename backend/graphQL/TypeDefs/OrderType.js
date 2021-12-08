const graphql = require("graphql");
const AddressType = require('./AddressType')
const Order = require('../../models/orderModel')
const { GraphQLObjectType, GraphQLString, GraphQLFloat, GraphQLList, GraphQLInt } = graphql

const OrderItemsType = new GraphQLObjectType({
    name: "OrderItems",
    fields: () => ({
        product: { type: GraphQLString },
        restaurantId: { type: GraphQLString },
        dishName: { type: GraphQLString },
        image: { type: GraphQLString },
        dishPrice: { type: GraphQLFloat },
        qty: { type: GraphQLInt },
    })
})

const OrderType = new GraphQLObjectType({
    name: "Order",
    fields: () => ({
        _id: { type: GraphQLString },
        userId: { type: GraphQLString },
        restaurantId: { type: GraphQLString },
        orderDate: { type: GraphQLString },
        orderType: { type: GraphQLString},
        orderStatus: { type: GraphQLString },
        paymentMethod: { type: GraphQLString },
        totalPrice: { type: GraphQLFloat },
        deliveryPrice: { type: GraphQLFloat },
        taxPrice: { type: GraphQLFloat },
        orderItems: { type: new GraphQLList(OrderItemsType),
            async resolve(parent, args){
                const order = await Order.findById({_id: parent._id})
                return order.orderItems
            }
        },
        deliveryAddress: { type: AddressType,
            async resolve(parent, args){
                const order = await Order.findById({_id: parent._id})
                return order.deliveryAddress
            }
        },
        instructions: { type: GraphQLString }

    })
})

module.exports = OrderType
