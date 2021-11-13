import { RESTAURANT_LIST_REQUEST,
    RESTAURANT_LIST_SUCCESS,
    RESTAURANT_LIST_FAIL,
    RESTAURANT_DISHES_REQUEST,
    RESTAURANT_DISHES_SUCCESS,
    RESTAURANT_DISHES_FAIL,
    RESTAURANT_DETAILS_REQUEST,
    RESTAURANT_DETAILS_SUCCESS,
    RESTAURANT_DETAILS_FAIL
} from '../constants/restaurantConstants'

export const restaurantListReducer = (state = { restaurants: []}, action) => {

    switch (action.type) {
        case RESTAURANT_LIST_REQUEST:
            return { loading: true, restaurants: [] }
        case RESTAURANT_LIST_SUCCESS:
            return { loading: false, restaurants: action.payload }
        case RESTAURANT_LIST_FAIL:
            return { loading: false, error: action.payload }
        default:
            return state
    }
}

export const restaurantDishesListReducer = (state = { dishes: []}, action) => {

    switch(action.type){
        case RESTAURANT_DISHES_REQUEST:
            return { loading: true, dishes: []}
        case RESTAURANT_DISHES_SUCCESS:
            return { loading: false, dishes: action.payload }
        case RESTAURANT_DISHES_FAIL:
            return { loading:false, error: action.payload }
        default:
            return state
    }
}

export const restaurantDetailsReducer = (state = {restaurantInfo: {}}, action) => {

    switch (action.type){
        case RESTAURANT_DETAILS_REQUEST:
            return { loading: true, restaurantInfo: {}}
        case RESTAURANT_DETAILS_SUCCESS:
            return { loading: false, restaurantInfo: action.payload }
        case RESTAURANT_DETAILS_FAIL:
            return { loading: false, restaurantInfo: action.payload}
        default:
            return state
    }
}