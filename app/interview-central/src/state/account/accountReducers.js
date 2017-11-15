import { LOGIN_SUCCESS, LOGIN_ERROR, REGISTER_SUCCESS, REGISTER_ERROR } from './accountActions';

const initialState = { success: false };

export function accountReducer(state = initialState, action) {
    switch(action.type) {
        case LOGIN_SUCCESS:
            let items = action.payload;
            if (items.success) {
                return {
                    success: true,
                    username: action.payload.username,
                }
            } else {
                return {
                    success: false,
                    error: action.payload.error
                }
            }
        case LOGIN_ERROR:
            return {
                error: true,
            }
        default:
            return state;
    }
}