import React from 'react';
import ReactDOM from 'react-dom';
import AppContainer from './AppContainer';
import LoginContainer from './LoginContainer';
import RegistrationContainer from './RegistrationContainer';
import SuiteContainer from './SuiteContainer';
import './index.css';
import { Provider } from 'react-redux';
import { configure } from './config/config-store';
import { Router, Route } from 'react-router';
import { createBrowserHistory } from 'history';
const store = configure({});
ReactDOM.render(
    <Provider store={store}>
        <Router history={createBrowserHistory()}>
            <div>
                <Route path="/login" component={LoginContainer}/>
                <Route path="/register" component={RegistrationContainer}/>
                <Route path={"/suite/:suiteId"} component={SuiteContainer}/>                
                <Route exact={true} path="/" component={AppContainer}/>
            </div>
        </Router>
    </Provider>,
    document.getElementById('root')
);
