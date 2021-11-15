import axios from 'axios'
import { CART_ADD_ITEM,CART_REMOVE_ITEM } from '../constants/cartConstants'

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