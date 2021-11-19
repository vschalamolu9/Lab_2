import {
    ORDER_CREATE_REQUEST,
    ORDER_CREATE_SUCCESS,
    ORDER_CREATE_FAIL,
    ORDER_DETAILS_REQUEST,
    ORDER_DETAILS_SUCCESS,
    ORDER_DETAILS_FAIL,
    GET_USER_ORDERS_REQUEST,
    GET_USER_ORDERS_SUCCESS,
    GET_USER_ORDERS_FAIL,
    GET_RESTAURANT_ORDERS_REQUEST,
    GET_RESTAURANT_ORDERS_SUCCESS,
    GET_RESTAURANT_ORDERS_FAIL,
    ORDER_CREATE_RESET, ORDER_DELIVER_REQUEST, ORDER_DELIVER_SUCCESS, ORDER_DELIVER_FAIL, ORDER_DELIVER_RESET
} from "../constants/orderConstants";

export const orderCreateReducer = (state = {}, action) => {

    switch(action.type){
        case ORDER_CREATE_REQUEST:
            return { loading: true}
        case ORDER_CREATE_SUCCESS:
            return { loading: false, success: true,  order: action.payload }
        case ORDER_CREATE_FAIL:
            return{ loading: false, error: action.payload }
        case ORDER_CREATE_RESET:
            return {}
        default:
            return state
    }
}

export const orderDetailsReducer = (state = { loading:true, orderItems: [], deliveryAddress: {} }, action) => {

    switch(action.type){
        case ORDER_DETAILS_REQUEST:
            return { ...state, loading: true}
        case ORDER_DETAILS_SUCCESS:
            return { loading: false, order: action.payload}
        case ORDER_DETAILS_FAIL:
            return { loading: false, error: action.payload}
        default:
            return state
    }
}

export const getUserOrdersReducer = (state = { userOrdersList: []}, action) =>{
    switch (action.type){
        case GET_USER_ORDERS_REQUEST:
            return { loading: true, userOrdersList: []}
        case GET_USER_ORDERS_SUCCESS:
            return { loading: false, userOrdersList: action.payload }
        case GET_USER_ORDERS_FAIL:
            return { loading: false, error: action.payload }
        default:
            return state

    }
}

export const getRestaurantOrdersReducer = (state = { restaurantOrdersList: []}, action) =>{
    switch (action.type){
        case GET_RESTAURANT_ORDERS_REQUEST:
            return { loading: true, restaurantOrdersList: []}
        case GET_RESTAURANT_ORDERS_SUCCESS:
            return { loading: false, restaurantOrdersList: action.payload }
        case GET_RESTAURANT_ORDERS_FAIL:
            return { loading: false, error: action.payload }
        default:
            return state

    }
}

export const orderDeliverReducer = (state = {}, action) => {

    switch (action.type) {
        case ORDER_DELIVER_REQUEST:
            return {loading: true,}
        case ORDER_DELIVER_SUCCESS:
            return {loading: false, success: true}
        case ORDER_DELIVER_FAIL:
            return {loading: false, error: action.payload}
        case ORDER_DELIVER_RESET:
            return {}
        default:
            return state
    }
}