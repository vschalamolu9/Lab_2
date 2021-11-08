import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from 'redux-thunk'
import { composeWithDevTools } from "redux-devtools-extension";
import { restaurantListReducer, restaurantMenuItemsListReducer } from './reducers/restaurantReducers'
import { menuItemDetailsReducer } from './reducers/menuItemReducers'

const reducer = combineReducers({
    restaurantList: restaurantListReducer,
    menuItemsList: restaurantMenuItemsListReducer,
    menuItemDetails: menuItemDetailsReducer
})

const initialState = {}

const middleware = [thunk]

const store = createStore(reducer, initialState, composeWithDevTools(applyMiddleware(...middleware)))

export default store