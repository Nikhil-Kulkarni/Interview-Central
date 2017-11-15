import { HOME_DATA_SUCCESS, HOME_DATA_ERROR } from './homeActions';

const initialState = { homeData: {}};

export function homeReducer(state = initialState, action) {
    switch(action.type) {
        case HOME_DATA_SUCCESS:
            return {
                homeData: action.payload.Items.questions,
            };
        case HOME_DATA_ERROR:
            return {
                error: true,
            }
        default:
            return state;
    }
}