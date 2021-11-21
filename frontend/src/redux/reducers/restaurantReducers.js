import { RESTAURANT_LIST_REQUEST,
    RESTAURANT_LIST_SUCCESS,
    RESTAURANT_LIST_FAIL,
    RESTAURANT_DISHES_REQUEST,
    RESTAURANT_DISHES_SUCCESS,
    RESTAURANT_DISHES_FAIL,
    RESTAURANT_DETAILS_REQUEST,
    RESTAURANT_DETAILS_SUCCESS,
    RESTAURANT_DETAILS_FAIL,
    RESTAURANT_SIGNUP_REQUEST,
    RESTAURANT_SIGNUP_SUCCESS,
    RESTAURANT_SIGNUP_FAIL,
    RESTAURANT_LOGIN_REQUEST,
    RESTAURANT_LOGIN_SUCCESS,
    RESTAURANT_LOGIN_FAIL,
    RESTAURANT_LOGOUT,
    RESTAURANT_UPDATE_PROFILE_REQUEST,
    RESTAURANT_UPDATE_PROFILE_SUCCESS,
    RESTAURANT_UPDATE_PROFILE_RESET,
    RESTAURANT_UPDATE_ADDRESS_FAIL,
    RESTAURANT_UPDATE_PROFILE_FAIL,
    RESTAURANT_UPDATE_ADDRESS_SUCCESS,
    RESTAURANT_UPDATE_ADDRESS_REQUEST,
    RESTAURANT_UPDATE_ADDRESS_RESET
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

export const restaurantSignUpReducer = (state = {}, action) => {
    switch (action.type) {
        case RESTAURANT_SIGNUP_REQUEST:
            return { loading: true }
        case RESTAURANT_SIGNUP_SUCCESS:
            return { loading: false, restaurantData: action.payload }
        case RESTAURANT_SIGNUP_FAIL:
            return { loading: false, error: action.payload }
        default:
            return state
    }
}

export const restaurantLoginReducer = (state = {}, action) => {
    switch (action.type) {
        case RESTAURANT_LOGIN_REQUEST:
            return { loading: true }
        case RESTAURANT_LOGIN_SUCCESS:
            return { loading: false, restaurantData: action.payload }
        case RESTAURANT_LOGIN_FAIL:
            return { loading: false, error: action.payload }
        case RESTAURANT_LOGOUT:
            return {}
        default:
            return state
    }
}

export const restaurantUpdateProfileReducer = (state = {}, action) => {

    switch (action.type){
        case RESTAURANT_UPDATE_PROFILE_REQUEST:
            return { loading: true}
        case RESTAURANT_UPDATE_PROFILE_SUCCESS:
            return { loading: false, success: true, restaurantInfo: action.payload }
        case RESTAURANT_UPDATE_PROFILE_FAIL:
            return { loading: false, error: action.payload }
        case RESTAURANT_UPDATE_PROFILE_RESET:
            return {}
        default:
            return state
    }
}

export const restaurantUpdateAddressReducer = (state = {}, action) => {

    switch (action.type){
        case RESTAURANT_UPDATE_ADDRESS_REQUEST:
            return { loading: true}
        case RESTAURANT_UPDATE_ADDRESS_SUCCESS:
            return { loading: false, success: true, restaurantInfo: action.payload }
        case RESTAURANT_UPDATE_ADDRESS_FAIL:
            return { loading: false, error: action.payload}
        case RESTAURANT_UPDATE_ADDRESS_RESET:
            return {}
        default:
            return state
    }
}

