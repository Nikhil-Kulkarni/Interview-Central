import { QUESTIONS_SUCCESS, QUESTIONS_ERROR } from './questionsActions';

const initialState = { success: false};

export function questionsReducer(state = initialState, action) {
    switch(action.type) {
        case QUESTIONS_SUCCESS:
            return {
                questions: action.payload,
                success: true,
            };
        case QUESTIONS_ERROR:
            return {
                error: true,
            }
        default:
            return state;
    }
}