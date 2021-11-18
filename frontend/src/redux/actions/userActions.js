import {
    USER_LOGIN_REQUEST,
    USER_LOGIN_SUCCESS,
    USER_LOGIN_FAIL,
    USER_LOGOUT,
    USER_SIGNUP_SUCCESS,
    USER_SIGNUP_REQUEST,
    USER_SIGNUP_FAIL, USER_UPDATE_PROFILE_REQUEST, USER_UPDATE_PROFILE_SUCCESS, USER_UPDATE_PROFILE_FAIL,
    USER_UPDATE_ADDRESS_REQUEST,
    USER_UPDATE_ADDRESS_SUCCESS,
    USER_UPDATE_ADDRESS_FAIL
} from "../constants/userConstants";
import axios from 'axios';

export const loginUser = (emailId, password) => async(dispatch) => {

    try{
        dispatch({
            type: USER_LOGIN_REQUEST
        })

        const config = {
            headers: {
                'Content-Type' : 'application/json'
            }
        }

        const { data } = await axios.post('/api/users/login', { emailId, password }, config)

        dispatch({ type: USER_LOGIN_SUCCESS, payload: data})

        localStorage.setItem('userInfo', JSON.stringify(data))
    }
    catch(error){
        dispatch({
            type: USER_LOGIN_FAIL,
            payload: error.response && error.response.data.message ? error.response.data.message : error.message
        })
    }
}

export const logout = () => (dispatch) => {
    localStorage.removeItem('userInfo')
    localStorage.removeItem('cartItems')
    localStorage.removeItem('deliveryFee')
    localStorage.removeItem('deliveryAddress')
    localStorage.removeItem('orderType')
    localStorage.removeItem('paymentMethod')
    dispatch({ type: USER_LOGOUT })
    document.location.href = '/user/login'
}

export const signUpUser = (firstName, lastName, emailId, password, city, state, country, zipCode, imageUrl ) => async(dispatch) => {

    try{
        dispatch({
            type: USER_SIGNUP_REQUEST
        })

        const config = {
            headers: {
                'Content-Type' : 'application/json'
            }
        }

        const { data } = await axios.post('/api/users/signup', { firstName, lastName, emailId, password, city, state, country, zipCode, imageUrl }, config)

        dispatch({
            type: USER_SIGNUP_SUCCESS,
            payload: data
        })

        dispatch({
            type: USER_LOGIN_SUCCESS,
            payload: data
        })

        localStorage.setItem('userInfo', JSON.stringify(data))
    }
    catch(error){
        dispatch({
            type: USER_SIGNUP_FAIL,
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message,
        })
    }
}

export const updateUserProfile = (userProfileObject) => async(dispatch, getState) => {

    try{
        dispatch({
            type: USER_UPDATE_PROFILE_REQUEST
        })

        const { userLogin: {userInfo}} = getState()

        const config = {
            headers: {
                'Content-Type' : 'application/json',
                'Authorization' : `Bearer ${userInfo.token}`
            }
        }

        const { data } = await axios.put(`/api/users/updateProfile`, userProfileObject, config)

        dispatch({
            type: USER_UPDATE_PROFILE_SUCCESS,
            payload: data
        })
        dispatch({
            type: USER_LOGIN_SUCCESS,
            payload: data,
        })
        localStorage.setItem('userInfo', JSON.stringify(data))
    }
    catch (error) {
        const message =
            error.response && error.response.data.message
                ? error.response.data.message
                : error.message
        if (message === 'Not authorized, token failed') {
            dispatch(logout())
        }
        dispatch({
            type: USER_UPDATE_PROFILE_FAIL,
            payload: message,
        })
    }
}

export const updateUserAddress = (userAddressObject) => async(dispatch, getState) => {

    try{
        dispatch({
            type: USER_UPDATE_ADDRESS_REQUEST
        })

        const { userLogin: {userInfo}} = getState()

        const config = {
            headers: {
                'Content-Type' : 'application/json',
                'Authorization' : `Bearer ${userInfo.token}`
            }
        }

        const { data } = await axios.put(`/api/users/updateAddress`, userAddressObject, config)

        dispatch({
            type: USER_UPDATE_ADDRESS_SUCCESS,
            payload: data
        })

        localStorage.setItem('userInfo', JSON.stringify(data))
    }
    catch (error) {
        const message =
            error.response && error.response.data.message
                ? error.response.data.message
                : error.message
        if (message === 'Not authorized, token failed') {
            dispatch(logout())
        }
        dispatch({
            type: USER_UPDATE_ADDRESS_FAIL,
            payload: message,
        })
    }
}