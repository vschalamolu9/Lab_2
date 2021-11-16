import axios from 'axios'
import {
    CART_ADD_ITEM,
    CART_REMOVE_ITEM,
    CART_SAVE_DELIVERY_ADDRESS,
    CART_SAVE_PAYMENT_METHOD, SAVE_ORDER_TYPE
} from '../constants/cartConstants'

export const addToCart = (id, qty) => async(dispatch, getState) => {

    const { data } = await axios.get(`/api/dishes/${id}`)

    dispatch({
        type: CART_ADD_ITEM,
        payload: {
            product: data._id,
            dishName: data.dishName,
            image: data.image,
            dishPrice: data.dishPrice,
            restaurantId: data.restaurantId,
            qty
        }
    })

    localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems))
}

export const removeFromCart = (id) => (dispatch, getState) => {

    dispatch({
        type: CART_REMOVE_ITEM,
        payload: id
    })

    localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems))
}

export const saveDeliveryAddress = (data) => (dispatch) => {

    dispatch({
        type: CART_SAVE_DELIVERY_ADDRESS,
        payload: data
    })

    localStorage.setItem('deliveryAddress', JSON.stringify(data))
}

export const savePaymentMethod = (data) => (dispatch) => {

    dispatch({
        type: CART_SAVE_PAYMENT_METHOD,
        payload: data
    })

    localStorage.setItem('paymentMethod', JSON.stringify(data))
}

export const saveOrderType = (data) => (dispatch) => {

    dispatch({
        type: SAVE_ORDER_TYPE,
        payload: data
    })

    localStorage.setItem('orderType', JSON.stringify(data))
}