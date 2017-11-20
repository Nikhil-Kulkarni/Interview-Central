import React from 'react';
import ReactDOM from 'react-dom';
import AppContainer from './AppContainer';
import LoginContainer from './LoginContainer';
import './index.css';
import { Provider } from 'react-redux';
import { configure } from './config/config-store';
import { Router, Route, hashHistory } from 'react-router';
import { createBrowserHistory } from 'history';
const store = configure({});
ReactDOM.render(
    <Provider store={store}>
        <Router history={createBrowserHistory()}>
            <div>
                <Route path="/login" component={LoginContainer}/>        
                <Route exact={true} path="/" component={AppContainer}/>
            </div>
        </Router>
    </Provider>,
    document.getElementById('root')
);