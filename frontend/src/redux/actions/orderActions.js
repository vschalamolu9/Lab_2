import { ORDER_CREATE_REQUEST, ORDER_CREATE_SUCCESS, ORDER_CREATE_FAIL } from "../constants/orderConstants";
import axios from 'axios';
import { logout } from './userActions'
import {DELETE_CART_ITEMS} from "../constants/cartConstants";

export const createOrder = (userId, restaurantId, orderDate, orderType, orderStatus, orderTotal, orderItems, deliveryAddress) => async(dispatch, getState) => {

    try{
        dispatch({
            type: ORDER_CREATE_REQUEST
        })

        const { userLogin: {userInfo}} = getState()

        const config = {
            headers: {
                'Content-Type' : 'application/json',
                'Authorization' : `Bearer ${userInfo.token}`
            }
        }

        const { data } = await axios.post(`/api/orders/addNewOrder`, { userId, restaurantId, orderDate, orderType, orderStatus, orderTotal, orderItems, deliveryAddress }, config)

        dispatch({
            type: ORDER_CREATE_SUCCESS,
            payload: data
        })

        localStorage.removeItem('cartItems')
        dispatch({
            type: DELETE_CART_ITEMS
        })
        localStorage.removeItem('deliveryFee')
        localStorage.removeItem('deliveryAddress')
        localStorage.removeItem('orderType')
        localStorage.removeItem('paymentMethod')
    }
    catch (error) {
        const message =
            error.response && error.response.data.message
                ? error.response.data.message
                : error.message
        if (message === 'Not authorized, token failed') {
            dispatch(logout())
        }
        dispatch({
            type: ORDER_CREATE_FAIL,
            payload: message,
        })
    }
}