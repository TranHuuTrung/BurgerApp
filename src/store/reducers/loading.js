import * as actionTypes from '../actions/actionTypes';

const initialState = {
    loading: false
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.LOADING_START:
            return true
        case actionTypes.LOADING_ENDED:
           return false
        default:
            return state ;
    }
};

export default reducer;