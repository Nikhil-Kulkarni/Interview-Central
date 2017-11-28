import { combineReducers } from 'redux';
import { questionsReducer } from '../state/questions/questionsReducers';
import { homeReducer } from '../state/home/homeReducers';
import { accountReducer } from '../state/account/accountReducers';
import { recommendedReducer } from '../state/recommended/recommendedReducers';

const rootReducer = combineReducers({
    questions: questionsReducer,
    home: homeReducer,
    account: accountReducer,
    recommended: recommendedReducer,
});

export default rootReducer;