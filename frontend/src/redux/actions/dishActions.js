import { DISH_DETAILS_REQUEST,
    DISH_DETAILS_SUCCESS,
    DISH_DETAILS_FAIL,
    ADD_DISH_REQUEST,
    ADD_DISH_SUCCESS,
    ADD_DISH_FAIL,
    UPDATE_DISH_REQUEST,
    UPDATE_DISH_SUCCESS,
    UPDATE_DISH_RESET,
    UPDATE_DISH_FAIL,
    ADD_DISH_RESET
} from '../constants/dishConstants'
import axios from 'axios'
import {logout} from "./userActions";
import {GET_RESTAURANT_ORDERS_FAIL} from "../constants/orderConstants";

export const detailsDish = (dishId) => async (dispatch) => {

    try{
        dispatch({type: DISH_DETAILS_REQUEST})

        const { data } = await axios.get(`/api/dishes/${dishId}`)

        dispatch({type: DISH_DETAILS_SUCCESS, payload: data })
    }catch(error){
        dispatch({
            type: DISH_DETAILS_FAIL,
            payload: error.response && error.response.data.message ? error.response.data.message : error.message,
        })
    }
}

export const addNewDish = (restaurantId, dishName, description, image, dishCategory, dishType, dishPrice) => async (dispatch, getState) => {

    try{
        dispatch({
            type: ADD_DISH_REQUEST
        })

        const { restaurantLogin: {restaurantData}} = getState()

        const config = {
            headers: {
                'Authorization' : `Bearer ${restaurantData.token}`
            }
        }

        const { data } = await axios.post('/api/dishes/addDish', { restaurantId, dishName, description, image, dishCategory, dishType, dishPrice }, config)

        dispatch({
            type: ADD_DISH_SUCCESS,
            payload: data
        })
    }catch(error){
        const message =
            error.response && error.response.data.message
                ? error.response.data.message
                : error.message
        if (message === 'Not authorized, token failed') {
            dispatch(logout())
        }
        dispatch({
            type: ADD_DISH_FAIL,
            payload: message,
        })
    }
}

