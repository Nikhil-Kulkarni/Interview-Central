import React from 'react';
import ReactDOM from 'react-dom';
import AppContainer from './AppContainer';
import './index.css';
import { Provider } from 'react-redux';
import { configure } from './config/config-store';
import { Router, Route, hashHistory } from 'react-router';
import { createBrowserHistory } from 'history';
const store = configure({});
ReactDOM.render(
    <Provider store={store}>
        <Router history={createBrowserHistory()}>
            <Route exact={true} path="/" component={AppContainer}/>
        </Router>
    </Provider>,
    document.getElementById('root')
);