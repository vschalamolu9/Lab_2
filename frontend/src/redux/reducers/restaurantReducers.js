import { RESTAURANT_LIST_REQUEST, RESTAURANT_LIST_SUCCESS, RESTAURANT_LIST_FAIL, RESTAURANT_MENU_ITEMS_REQUEST, RESTAURANT_MENU_ITEMS_SUCCESS, RESTAURANT_MENU_ITEMS_FAIL } from '../constants/restaurantConstants'

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

export const restaurantMenuItemsList = (state = { menuItems: []}, action) => {

    switch(action.type){
        case RESTAURANT_MENU_ITEMS_REQUEST:
            return { loading: true, menuItems: []}
        case RESTAURANT_MENU_ITEMS_SUCCESS:
            return { loading: false, menuItems: action.payload }
        case RESTAURANT_MENU_ITEMS_FAIL:
            return { loading:false, error: action.payload }
        default:
            return state
    }
}