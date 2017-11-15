import { combineReducers } from 'redux';
import { questionsReducer } from '../state/questions/questionsReducers';
import { homeReducer } from '../state/home/homeReducers';

const rootReducer = combineReducers({
    questions: questionsReducer,
    home: homeReducer,
});

export default rootReducer;