import React from 'react';
import ReactDOM from 'react-dom';
import AppContainer from './AppContainer';
import './index.css';
import { Provider } from 'react-redux';
import { configure } from './config/config-store';
const store = configure({});
ReactDOM.render(
    <Provider store={store}>
        <AppContainer />
    </Provider>,
    document.getElementById('root')
);