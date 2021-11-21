import {
    ORDER_CREATE_REQUEST,
    ORDER_CREATE_SUCCESS,
    ORDER_CREATE_FAIL,
    ORDER_DETAILS_REQUEST,
    ORDER_DETAILS_SUCCESS,
    ORDER_DETAILS_FAIL,
    GET_USER_ORDERS_REQUEST,
    GET_USER_ORDERS_FAIL,
    GET_USER_ORDERS_SUCCESS,
    GET_RESTAURANT_ORDERS_REQUEST,
    GET_RESTAURANT_ORDERS_SUCCESS,
    GET_RESTAURANT_ORDERS_FAIL,
    UPDATE_ORDER_STATUS_REQUEST,
    UPDATE_ORDER_STATUS_SUCCESS, UPDATE_ORDER_STATUS_FAIL
} from "../constants/orderConstants";
import axios from 'axios';
import { logout } from './userActions'

export const createOrder = (userId, restaurantId, orderDate, orderType, orderStatus,paymentMethod, totalPrice, deliveryPrice, taxPrice, orderItems, deliveryAddress, instructions) => async(dispatch, getState) => {

    try{
        dispatch({
            type: ORDER_CREATE_REQUEST
        })

        const { userLogin: {userInfo}} = getState()

        const config = {
            headers: {
                'Authorization' : `Bearer ${userInfo.token}`
            }
        }

        const { data } = await axios.post(`/api/orders/addNewOrder`, { userId, restaurantId, orderDate, orderType, orderStatus,paymentMethod, totalPrice, deliveryPrice, taxPrice, orderItems, deliveryAddress, instructions }, config)

        dispatch({
            type: ORDER_CREATE_SUCCESS,
            payload: data
        })

        localStorage.removeItem('cartItems')
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

export const getOrderDetails = (orderId) => async (dispatch, getState) => {

    try{
        dispatch({
            type: ORDER_DETAILS_REQUEST
        })

        const { userLogin: {userInfo}} = getState()

        const { restaurantLogin: {restaurantData}} = getState()

        const authToken = userInfo === null ? restaurantData.token : userInfo.token

        const config = {
            headers: {
                'Content-Type' : 'application/json',
                'Authorization' : `Bearer ${ authToken }`
            }
        }

        const { data } = await axios.get(`/api/orders/${orderId}`, config)

        dispatch({
            type: ORDER_DETAILS_SUCCESS,
            payload: data
        })

        localStorage.removeItem('cartItems')
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
            type: ORDER_DETAILS_FAIL,
            payload: message,
        })
    }


}

export const fetchUserOrders = (userId, pageNumber='', pageSize='') => async (dispatch, getState) => {

    try{
        dispatch({
            type: GET_USER_ORDERS_REQUEST
        })

        const { userLogin: {userInfo}} = getState()

        const config = {
            headers: {
                'Authorization' : `Bearer ${userInfo.token}`
            }
        }

        const { data } = await axios.get(`/api/orders/userOrders/${userId}?pageSize=${pageSize}&page=${pageNumber}`, config)

        dispatch({
            type: GET_USER_ORDERS_SUCCESS,
            payload: data
        })
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
            type: GET_USER_ORDERS_FAIL,
            payload: message,
        })
    }
}

export const fetchRestaurantOrders = (restaurantId, pageNumber='', pageSize='') => async (dispatch, getState) => {

    try{
        dispatch({
            type: GET_RESTAURANT_ORDERS_REQUEST
        })

        const { restaurantLogin: {restaurantData}} = getState()

        const config = {
            headers: {
                'Authorization' : `Bearer ${restaurantData.token}`
            }
        }

        const { data } = await axios.get(`/api/orders/restaurantOrders/${restaurantId}?pageSize=${pageSize}&page=${pageNumber}`, config)

        dispatch({
            type: GET_RESTAURANT_ORDERS_SUCCESS,
            payload: data
        })
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
            type: GET_RESTAURANT_ORDERS_FAIL,
            payload: message,
        })
    }
}

export const updateOrderStatus = (_id, orderStatus) => async (dispatch, getState) => {

    try{
        dispatch({
            type: UPDATE_ORDER_STATUS_REQUEST
        })

        const { restaurantLogin: { restaurantData} } = getState()

        const config = {
            headers: {
                'Content-Type' : 'application/json',
                'Authorization' : `Bearer ${restaurantData.token}`
            }
        }

        const { data } = await axios.put('/api/orders/updateStatus', { _id, orderStatus }, config)

        dispatch({
            type: UPDATE_ORDER_STATUS_SUCCESS,
            payload: data
        })

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
            type: UPDATE_ORDER_STATUS_FAIL,
            payload: message
        })
    }
}

export const updateUserOrderStatus = (_id, orderStatus) => async (dispatch, getState) => {

    try{
        dispatch({
            type: UPDATE_ORDER_STATUS_REQUEST
        })


        const { userLogin: {userInfo}} = getState()

        const config = {
            headers: {
                'Authorization' : `Bearer ${userInfo.token}`
            }
        }

        const { data } = await axios.put('/api/orders/updateStatus', { _id, orderStatus }, config)

        dispatch({
            type: UPDATE_ORDER_STATUS_SUCCESS,
            payload: data
        })

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
            type: UPDATE_ORDER_STATUS_FAIL,
            payload: message
        })
    }
}