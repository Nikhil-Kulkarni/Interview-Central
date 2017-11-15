import { HOME_DATA_SUCCESS, HOME_DATA_ERROR } from './homeActions';

const initialState = { mySuite: [] };

export function homeReducer(state = initialState, action) {
    switch(action.type) {
        case HOME_DATA_SUCCESS:
            let items = action.payload.Items;
            if (items.length === 0) {
                return state;
            } else {
                return {
                    mySuite: action.payload.Items[0].questions,
                };
            }
        case HOME_DATA_ERROR:
            return {
                error: true,
            }
        default:
            return state;
    }
}