import { MENU_ITEM_DETAILS_REQUEST, MENU_ITEM_DETAILS_SUCCESS, MENU_ITEM_DETAILS_FAIL } from '../constants/menuItemConstants'
import axios from 'axios'

export const detailsMenuItem = (menuItemId) => async (dispatch) => {

    try{
        dispatch({type: MENU_ITEM_DETAILS_REQUEST})

        const { data } = await axios.get(`/api/item/${menuItemId}`)

        dispatch({type: MENU_ITEM_DETAILS_SUCCESS, payload: data })
    }catch(error){
        dispatch({
            type: MENU_ITEM_DETAILS_FAIL,
            payload: error.response && error.response.data.message ? error.response.data.message : error.message,
        })
    }
}

