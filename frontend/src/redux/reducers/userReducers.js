import {
    USER_LOGIN_REQUEST,
    USER_LOGIN_SUCCESS,
    USER_LOGIN_FAIL,
    USER_SIGNUP_REQUEST,
    USER_SIGNUP_SUCCESS,
    USER_SIGNUP_FAIL,
    USER_LOGOUT,
    USER_UPDATE_PROFILE_REQUEST,
    USER_UPDATE_PROFILE_SUCCESS,
    USER_UPDATE_PROFILE_FAIL,
    USER_UPDATE_ADDRESS_REQUEST,
    USER_UPDATE_ADDRESS_SUCCESS,
    USER_UPDATE_ADDRESS_FAIL, USER_UPDATE_PROFILE_RESET, USER_UPDATE_ADDRESS_RESET
} from '../constants/userConstants';

export const userLoginReducer = (state = {}, action) => {
    switch (action.type){
        case USER_LOGIN_REQUEST:
            return { loading: true }
        case USER_LOGIN_SUCCESS:
            return { loading: false, userInfo: action.payload }
        case USER_LOGIN_FAIL:
            return { loading: false, error: action.payload }
        case USER_LOGOUT:
            return {}
        default:
            return state
    }
}

export const userSignUpReducer = (state = {}, action) => {
    switch(action.type){
        case USER_SIGNUP_REQUEST:
            return { loading: true }
        case USER_SIGNUP_SUCCESS:
            return { loading: false, userInfo: action.payload }
        case USER_SIGNUP_FAIL:
            return { loading: false, error: action.payload }
        case USER_LOGOUT:
            return {}
        default:
            return state
    }
}

export const userUpdateProfileReducer = (state = {}, action) => {

    switch (action.type){
        case USER_UPDATE_PROFILE_REQUEST:
            return { loading: true}
        case USER_UPDATE_PROFILE_SUCCESS:
            return { loading: false, success: true, userInfo: action.payload }
        case USER_UPDATE_PROFILE_FAIL:
            return { loading: false, error: action.payload }
        case USER_UPDATE_PROFILE_RESET:
            return {}
        default:
            return state
    }
}

export const userUpdateAddressReducer = (state = {}, action) => {

    switch (action.type){
        case USER_UPDATE_ADDRESS_REQUEST:
            return { loading: true}
        case USER_UPDATE_ADDRESS_SUCCESS:
            return { loading: false, success: true, userInfo: action.payload }
        case USER_UPDATE_ADDRESS_FAIL:
            return { loading: false, error: action.payload}
        case USER_UPDATE_ADDRESS_RESET:
            return {}
        default:
            return state
    }
}