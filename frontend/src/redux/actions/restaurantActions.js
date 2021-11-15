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
    RESTAURANT_SIGNUP_FAIL
} from '../constants/restaurantConstants'
import axios from 'axios'

export const listRestaurants = () => async (dispatch) => {

    try{
        dispatch({type: RESTAURANT_LIST_REQUEST})

        const { data } = await axios.get('/api/restaurants')

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

export const signUpRestaurant = (restaurantName, restaurantEmail, password, city, province, country, zipCode, imageUrl ) => async(dispatch) => {

    try{
        dispatch({
            type: RESTAURANT_SIGNUP_REQUEST
        })

        const config = {
            headers: {
                'Content-Type' : 'application/json'
            }
        }

        const { data } = await axios.post('/api/restaurants/signup', { restaurantName, restaurantEmail, password, city, province, country, zipCode, imageUrl }, config)

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