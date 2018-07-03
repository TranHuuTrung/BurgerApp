import * as actionTypes from '../actions/actionTypes';
import {updateObject} from '../utility';

const initialState = {
    orders: [],
    purchased: false
};

const purchaseInit = (state, action) => {
    return updateObject(state, { purchased: false });
};

const purchaseBurgerSuccess = (state, action) => {
    const newOrder = updateObject(action.orderData, { id: action.orderId });
    return updateObject(state, {
        orders: state.orders.concat(newOrder),
        purchased: true
    });
};

const fetchOrdersSuccess = (state, action) => {
    return updateObject(state, { orders: action.orders });
}
const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.PURCHASE_INIT: return purchaseInit(state, action);
        case actionTypes.PURCHASE_BURGER_SUCCESS: return purchaseBurgerSuccess(state, action);
        // case actionTypes.PURCHASE_BURGER_FAIL:
        //     return state;
        // case actionTypes.FETCH_ORDER_START:
        //     return {
        //         ...state
        //     };
        case actionTypes.FETCH_ORDER_SUCCESS: return fetchOrdersSuccess(state, action);
        // case actionTypes.FETCH_ORDER_FAIL:
        //     return state;
        default: return state;
    }
};

export default reducer;