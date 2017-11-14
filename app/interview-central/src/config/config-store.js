import { createStore, applyMiddleware, compose } from 'redux';
import thunkMiddleware from 'redux-thunk';
import {persistStore, autoRehydrate} from 'redux-persist';
import { routerMiddleware } from 'react-router-redux';
import createHistory from 'history/createBrowserHistory';
import { createLogger } from 'redux-logger';
import rootReducer from './rootReducer';

export const history = createHistory();
const middleware = [
    thunkMiddleware,
    routerMiddleware(history),
];

const logger = createLogger({
    level: 'info',
    collapsed: true,
});

if (process.env.NODE_ENV === 'development') {
    middleware.push(logger);
} else {

}

export function configure(initialState) {
    var configStore = createStore(
        rootReducer,
        initialState, 
        compose(
            applyMiddleware(
                thunkMiddleware,
                routerMiddleware(history),    
            ),
            autoRehydrate(),
        ),      
    )

    persistStore(configStore);
    return configStore;
};