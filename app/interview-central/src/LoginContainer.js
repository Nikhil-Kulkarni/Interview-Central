import React, { Component } from 'react';
import { connect } from 'react-redux';
import Login from './Login';
import { loginUserAction, loginWithFb } from './state/account/accountActions';
import { getHomeDataAction, getSharedDataAction } from './state/home/homeActions';
import { getAccountInfo } from './state/account/accountSelectors';
import { getRecommendedAction } from './state/recommended/recommendedActions';

export class LoginCont extends Component {

    componentWillMount() {
        this.handleLoginDone = this.handleLoginDone.bind(this);
        this.handleFBLoginDone = this.handleFBLoginDone.bind(this);
    }

    handleLoginDone(username, password) {
        this.props.loginFunc(username, password);
    }

    handleFBLoginDone(userID) {
        this.props.loginWithFb(userID);
    }

    render() {
        const account = this.props.account;
        if (account.done && account.success) {
            this.props.getHomeData(account.username);
            this.props.getSharedData(account.username);
            this.props.getRecommended(account.username);
            this.props.history.push("/");
            return <div />;
        }

        return (
            <Login loginFunc={this.handleLoginDone} loginFBFunc={this.handleFBLoginDone} accountState={this.props.account}/>
        ); 
    }
}

const mapStateToProps = function(state) {
    return {
        account: getAccountInfo(state),
    };
};

const mapDispatchToProps = function(dispatch) {
    return {
        getHomeData: (username) => dispatch(getHomeDataAction(username)),
        getSharedData: (username) => dispatch(getSharedDataAction(username)),
        loginFunc: (username, password) => dispatch(loginUserAction(username, password)),
        loginWithFb: (userID) => dispatch(loginWithFb(userID)),
        getRecommended: (username) => dispatch(getRecommendedAction(username)),
    };
};

const LoginContainer = connect(
    mapStateToProps, 
    mapDispatchToProps,    
) (LoginCont);

export default LoginContainer;