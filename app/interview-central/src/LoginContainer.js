import React, { Component } from 'react';
import { connect } from 'react-redux';
import Login from './Login';
import { loginUserAction } from './state/account/accountActions';
import { getAccountInfo } from './state/account/accountSelectors';

export class LoginCont extends Component {

    componentWillMount() {
    }

    render() {
        return (
            <Login loginFunc={loginUserAction}/>
        );
    }
}

const mapStateToProps = function(state) {
    return {
        account: getAccountInfo(state),
    };
};

const LoginContainer = connect(
    mapStateToProps,    
) (LoginCont);

export default LoginContainer;