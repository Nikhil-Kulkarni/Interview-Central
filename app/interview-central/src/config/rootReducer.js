import { combineReducers } from 'redux';
import { questionsReducer } from '../state/questions/questionsReducers';

const rootReducer = combineReducers({
    questions: questionsReducer,
});

export default rootReducer;