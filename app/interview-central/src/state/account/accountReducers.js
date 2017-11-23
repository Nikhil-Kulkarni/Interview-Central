import { LOGIN_SUCCESS, LOGIN_ERROR } from './accountActions';

const initialState = { done: false };

export function accountReducer(state = initialState, action) {
    switch(action.type) {
        case LOGIN_SUCCESS:
            let items = action.payload;
            if (items.success) {
                return {
                    done: true,
                    success: true,
                    username: action.payload.username,
                }
            } else {
                return {
                    done: true,
                    success: false,
                    error: action.payload.error
                }
            }
        case LOGIN_ERROR:
            return {
                done: true,
                error: true,
            }
        default:
            return state;
    }
}