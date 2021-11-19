import {
    DISH_DETAILS_REQUEST,
    DISH_DETAILS_SUCCESS,
    DISH_DETAILS_FAIL,
    ADD_DISH_REQUEST,
    ADD_DISH_SUCCESS,
    ADD_DISH_FAIL,
    UPDATE_DISH_REQUEST,
    UPDATE_DISH_SUCCESS,
    UPDATE_DISH_FAIL, ADD_DISH_RESET, UPDATE_DISH_RESET
} from '../constants/dishConstants'

export const dishDetailsReducer = (state = {dish: {}}, action) => {

    switch(action.type){
        case DISH_DETAILS_REQUEST:
            return { loading: true, dish: {}}
        case DISH_DETAILS_SUCCESS:
            return { loading: false, dish: action.payload }
        case DISH_DETAILS_FAIL:
            return { loading: false, dish: action.payload}
        default:
            return state
    }
}

export const addDishReducer = (state = {}, action) => {

    switch(action.type){
        case ADD_DISH_REQUEST:
            return { loading: true}
        case ADD_DISH_SUCCESS:
            return { loading: false, success: true, dish: action.payload }
        case ADD_DISH_FAIL:
            return { loading: false, error: action.payload}
        case ADD_DISH_RESET:
            return {}
        default:
            return state
    }
}

export const updateDishReducer = (state = {}, action) => {
    switch(action.type){
        case UPDATE_DISH_REQUEST:
            return { loading: true }
        case UPDATE_DISH_SUCCESS:
            return { loading: false, dish: action.payload, success: true}
        case UPDATE_DISH_FAIL:
            return { loading: false, error: action.payload}
        case UPDATE_DISH_RESET:
            return {}
        default:
            return state

    }
}