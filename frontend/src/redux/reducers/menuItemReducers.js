import { MENU_ITEM_DETAILS_REQUEST, MENU_ITEM_DETAILS_SUCCESS, MENU_ITEM_DETAILS_FAIL } from '../constants/menuItemConstants'

export const menuItemDetailsReducer = (state = {menuItem: {}}, action) => {

    switch(action.type){
        case MENU_ITEM_DETAILS_REQUEST:
            return { loading: true, menuItem: {}}
        case MENU_ITEM_DETAILS_SUCCESS:
            return { loading: false, menuItem: action.payload }
        case MENU_ITEM_DETAILS_FAIL:
            return { loading: false, menuItem: action.payload}
        default:
            return state
    }
}