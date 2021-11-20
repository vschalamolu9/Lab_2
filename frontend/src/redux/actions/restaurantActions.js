import {
    RESTAURANT_LIST_REQUEST,
    RESTAURANT_LIST_SUCCESS,
    RESTAURANT_LIST_FAIL,
    RESTAURANT_DISHES_SUCCESS,
    RESTAURANT_DISHES_REQUEST,
    RESTAURANT_DISHES_FAIL,
    RESTAURANT_DETAILS_REQUEST,
    RESTAURANT_DETAILS_SUCCESS,
    RESTAURANT_DETAILS_FAIL,
    RESTAURANT_LOGIN_REQUEST,
    RESTAURANT_LOGIN_SUCCESS,
    RESTAURANT_LOGIN_FAIL,
    RESTAURANT_LOGOUT,
    RESTAURANT_SIGNUP_REQUEST,
    RESTAURANT_SIGNUP_SUCCESS,
    RESTAURANT_SIGNUP_FAIL,
    RESTAURANT_UPDATE_ADDRESS_REQUEST,
    RESTAURANT_UPDATE_ADDRESS_SUCCESS,
    RESTAURANT_UPDATE_ADDRESS_FAIL,
    RESTAURANT_UPDATE_PROFILE_REQUEST,
    RESTAURANT_UPDATE_PROFILE_SUCCESS,
    RESTAURANT_UPDATE_PROFILE_FAIL
} from '../constants/restaurantConstants'
import axios from 'axios'

export const listRestaurants = (pageNumber='') => async (dispatch) => {

    try{
        dispatch({type: RESTAURANT_LIST_REQUEST})

        const { data } = await axios.get(`/api/restaurants?pageNumber=${pageNumber}`)

        dispatch({type: RESTAURANT_LIST_SUCCESS, payload: data})
    }catch(error){
        dispatch({
            type: RESTAURANT_LIST_FAIL,
            payload: error.response && error.response.data.message ? error.response.data.message : error.message,
        })
    }
}

export const listDishes = (restaurantId) => async (dispatch) => {

    try{
        dispatch({type: RESTAURANT_DISHES_REQUEST})

        const { data } = await axios.get(`/api/restaurants/${restaurantId}`)

        dispatch({type: RESTAURANT_DISHES_SUCCESS, payload: data})
    }catch(error){
        dispatch({
            type: RESTAURANT_DISHES_FAIL,
            payload: error.response && error.response.data.message ? error.response.data.message : error.message,
        })
    }
}

export const detailsRestaurant = (restaurantId) => async(dispatch) => {

    try{
        dispatch({type: RESTAURANT_DETAILS_REQUEST})

        const { data } = await axios.get(`/api/restaurants/details/${restaurantId}`)

        dispatch({type: RESTAURANT_DETAILS_SUCCESS, payload: data})
    }
    catch(error){
        dispatch({
            type: RESTAURANT_DETAILS_FAIL,
            payload: error.response && error.response.data.message ? error.response.data.message : error.message
        })
    }
}

export const loginRestaurant = (restaurantEmail, password) => async(dispatch) => {

    try{
        dispatch({
            type: RESTAURANT_LOGIN_REQUEST
        })

        const config = {
            headers: {
                'Content-Type' : 'application/json'
            }
        }

        const { data } = await axios.post('/api/restaurants/login', {restaurantEmail, password}, config)

        dispatch({
            type: RESTAURANT_LOGIN_SUCCESS,
            payload: data
        })
    }
    catch (error){
        dispatch({
            type: RESTAURANT_LOGIN_FAIL,
            payload: error.response && error.response.data.message ? error.response.data.message : error.message
        })
    }
}

export const logoutRestaurant = () => (dispatch) => {
    localStorage.removeItem('restaurantData')
    dispatch({ type: RESTAURANT_LOGOUT })
    document.location.href = '/res/login'
}

export const signUpRestaurant = (restaurantName, restaurantEmail, password, restaurantType, city, province, country, zipCode, imageUrl ) => async(dispatch) => {

    try{
        dispatch({
            type: RESTAURANT_SIGNUP_REQUEST
        })

        const config = {
            headers: {
                'Content-Type' : 'application/json'
            }
        }

        const { data } = await axios.post('/api/restaurants/signup', { restaurantName, restaurantEmail, password, restaurantType, city, province, country, zipCode, imageUrl }, config)

        dispatch({
            type: RESTAURANT_SIGNUP_SUCCESS,
            payload: data
        })

        localStorage.setItem('restaurantData', JSON.stringify(data))
    }
    catch(error){
        dispatch({
            type: RESTAURANT_SIGNUP_FAIL,
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message,
        })
    }
}

export const updateRestaurantAddress = (_id, street, city, province, country, zipCode) => async(dispatch, getState) => {
    try{
        dispatch({
            type: RESTAURANT_UPDATE_ADDRESS_REQUEST
        })

        const { restaurantLogin: {restaurantData}} = getState()

        const config = {
            headers: {
                'Content-Type' : 'application/json',
                'Authorization' : `Bearer ${restaurantData.token}`
            }
        }

        const { data } = await axios.put(`/api/restaurants/updateAddress`, { _id, street, city, province, country, zipCode }, config)

        dispatch({
            type: RESTAURANT_UPDATE_ADDRESS_SUCCESS,
            payload: data
        })


    }
    catch (error) {
        const message =
            error.response && error.response.data.message
                ? error.response.data.message
                : error.message
        if (message === 'Not authorized, token failed') {
            dispatch(restaurantLogout())
        }
        dispatch({
            type: RESTAURANT_UPDATE_ADDRESS_FAIL,
            payload: message,
        })
    }
}

export const updateRestaurantProfile = (_id, restaurantName,restaurantEmail, password, restaurantType, description, imageUrl, contact, deliveryFee, workHrsFrom, workHrsTo) => async(dispatch, getState) => {

    try{
        dispatch({
            type: RESTAURANT_UPDATE_PROFILE_REQUEST
        })

        const { restaurantLogin: {restaurantData}} = getState()

        const config = {
            headers: {
                'Content-Type' : 'application/json',
                'Authorization' : `Bearer ${restaurantData.token}`
            }
        }

        const { data } = await axios.put(`/api/restaurants/updateProfile`, {_id, restaurantName,restaurantEmail, password, restaurantType, description, imageUrl, contact, deliveryFee, workHrsFrom, workHrsTo}, config)

        dispatch({
            type: RESTAURANT_UPDATE_PROFILE_SUCCESS,
            payload: data
        })
        dispatch({
            type: RESTAURANT_LOGIN_SUCCESS,
            payload: data,
        })
    }
    catch (error) {
        const message =
            error.response && error.response.data.message
                ? error.response.data.message
                : error.message
        if (message === 'Not authorized, token failed') {
            dispatch(restaurantLogout())
        }
        dispatch({
            type: RESTAURANT_UPDATE_PROFILE_FAIL,
            payload: message,
        })
    }
}

export const restaurantLogout = () => (dispatch) => {
    dispatch({ type: RESTAURANT_LOGOUT })
    document.location.href = '/res/login'
}