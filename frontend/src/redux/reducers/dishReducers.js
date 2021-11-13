import { DISH_DETAILS_REQUEST, DISH_DETAILS_SUCCESS, DISH_DETAILS_FAIL } from '../constants/dishConstants'

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