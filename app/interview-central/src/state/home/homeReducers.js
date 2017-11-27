import { HOME_DATA_SUCCESS, HOME_DATA_ERROR, GET_SHARED_SUCCESS } from './homeActions';

const initialState = { mySuite: [] };

export function homeReducer(state = initialState, action) {
    switch(action.type) {
        case HOME_DATA_SUCCESS:
            let items = action.payload.Items;
            if (items.length === 0) {
                return state;
            } else {
                return Object.assign({}, state, {
                    mySuite: action.payload.Items,                    
                });
            }
        case HOME_DATA_ERROR:
            return {
                error: true,
            }
        case GET_SHARED_SUCCESS:
            return Object.assign({}, state, {
                shared: action.payload,
            });
        default:
            return state;
    }
}
