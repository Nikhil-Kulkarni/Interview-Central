import React, { Component } from 'react';
import { connect } from 'react-redux';
import Login from './Login';

export class LoginCont extends Component {

    componentWillMount() {

    }

    render() {
        return (
            <Login />
        );
    }
}

const mapStateToProps = function(state) {
    return {
    };
};

const mapDispatchToProps = function(dispatch) {
    return {
    };
};

const LoginContainer = connect(
) (LoginCont);

export default LoginContainer;