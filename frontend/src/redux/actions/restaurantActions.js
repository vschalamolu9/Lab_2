import {
    RESTAURANT_LIST_REQUEST,
    RESTAURANT_LIST_SUCCESS,
    RESTAURANT_LIST_FAIL,
    RESTAURANT_DISHES_SUCCESS,
    RESTAURANT_DISHES_REQUEST,
    RESTAURANT_DISHES_FAIL,
    RESTAURANT_DETAILS_REQUEST,
    RESTAURANT_DETAILS_SUCCESS,
    RESTAURANT_DETAILS_FAIL
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