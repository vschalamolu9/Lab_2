import {
    CART_ADD_ITEM,
    CART_REMOVE_ITEM,
    CART_SAVE_DELIVERY_ADDRESS,
    CART_SAVE_PAYMENT_METHOD, CART_CLEAR_ITEMS, SAVE_ORDER_TYPE
} from '../constants/cartConstants'

export const cartReducer = (state={cartItems:[]}, action) => {

    switch (action.type){
        case CART_ADD_ITEM:
            const item = action.payload
            const existItem = state.cartItems.find(i => i.product === item.product)

            if(existItem){
                return {
                    ...state,
                    cartItems: state.cartItems.map(x => x.product === existItem.product ? item : x)
                }
            }
            else{
                return {
                    ...state,
                    cartItems: [...state.cartItems, item]
                }
            }
        case CART_REMOVE_ITEM:
            return{
                ...state,
                cartItems: state.cartItems.filter((x) => x.product !== action.payload)
            }
        case CART_SAVE_DELIVERY_ADDRESS:
            return{
                ...state,
                deliveryAddress: action.payload,
            }
        case CART_SAVE_PAYMENT_METHOD:
            return{
                ...state,
                paymentMethod: action.payload,
            }
        case SAVE_ORDER_TYPE:
            return{
                ...state,
                orderType: action.payload
            }
        case CART_CLEAR_ITEMS:
            localStorage.removeItem('cartItems')
            return({
                ...state,
                cartItems: []
            })
        default:
            return state
    }
}