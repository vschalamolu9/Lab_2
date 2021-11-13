import { DISH_DETAILS_REQUEST, DISH_DETAILS_SUCCESS, DISH_DETAILS_FAIL } from '../constants/dishConstants'
import axios from 'axios'

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

