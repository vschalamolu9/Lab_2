import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from 'redux-thunk'
import { composeWithDevTools } from "redux-devtools-extension";
import { restaurantListReducer, restaurantDishesListReducer, restaurantDetailsReducer, restaurantLoginReducer, restaurantSignUpReducer } from './reducers/restaurantReducers'
import { userLoginReducer, userSignUpReducer, userUpdateProfileReducer, userUpdateAddressReducer } from './reducers/userReducers'
import { dishDetailsReducer } from './reducers/dishReducers'
import { cartReducer } from "./reducers/cartReducers";
import { orderCreateReducer, orderDetailsReducer, getUserOrdersReducer, getRestaurantOrdersReducer } from './reducers/orderReducers';

const reducer = combineReducers({
    restaurantList: restaurantListReducer,
    dishesList: restaurantDishesListReducer,
    dishDetails: dishDetailsReducer,
    restaurantDetails: restaurantDetailsReducer,
    cart: cartReducer,
    userLogin: userLoginReducer,
    userSignUp: userSignUpReducer,
    restaurantLogin: restaurantLoginReducer,
    restaurantSignUp: restaurantSignUpReducer,
    orderCreate: orderCreateReducer,
    orderDetails: orderDetailsReducer,
    userProfile: userUpdateProfileReducer,
    userAddress: userUpdateAddressReducer,
    userOrders: getUserOrdersReducer,
    restaurantOrders: getRestaurantOrdersReducer
})

const cartItemsFromStorage = localStorage.getItem('cartItems') ? JSON.parse(localStorage.getItem('cartItems')) : []

const userInfoFromStorage = localStorage.getItem('userInfo') ? JSON.parse(localStorage.getItem('userInfo')) : null

const restaurantDataFromStorage = localStorage.getItem('restaurantData' ? JSON.parse(localStorage.getItem('restaurantData')) : null)

const initialState = {
    cart: { cartItems: cartItemsFromStorage },
    userLogin: { userInfo: userInfoFromStorage },
    restaurantLogin: { restaurantData: restaurantDataFromStorage }
}

const middleware = [thunk]

const store = createStore(reducer, initialState, composeWithDevTools(applyMiddleware(...middleware)))

export default store