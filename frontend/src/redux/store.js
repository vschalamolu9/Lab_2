import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from 'redux-thunk'
import { composeWithDevTools } from "redux-devtools-extension";
import { restaurantListReducer, restaurantDishesListReducer, restaurantDetailsReducer } from './reducers/restaurantReducers'
import { dishDetailsReducer } from './reducers/dishReducers'
import { cartReducer } from "./reducers/cartReducers";

const reducer = combineReducers({
    restaurantList: restaurantListReducer,
    dishesList: restaurantDishesListReducer,
    dishDetails: dishDetailsReducer,
    restaurantDetails: restaurantDetailsReducer,
    cart: cartReducer
})

const cartItemsFromStorage = localStorage.getItem('cartItems') ? JSON.parse(localStorage.getItem('cartItems')) : []

const initialState = {
    cart: { cartItems: cartItemsFromStorage }
}

const middleware = [thunk]

const store = createStore(reducer, initialState, composeWithDevTools(applyMiddleware(...middleware)))

export default store