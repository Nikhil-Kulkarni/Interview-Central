import React, { Component } from 'react';
import { connect } from 'react-redux';
import Login from './Login';
import { loginUserAction } from './state/account/accountActions';
import { getHomeDataAction } from './state/home/homeActions';
import { getAccountInfo } from './state/account/accountSelectors';

export class LoginCont extends Component {

    componentWillMount() {
        this.handleLoginDone = this.handleLoginDone.bind(this);
    }

    handleLoginDone(username, password) {
        this.props.loginFunc(username, password);
    }

    render() {
        const account = this.props.account;
        if (account.done && account.success) {
            this.props.getHomeData(account.username);
            this.props.history.push("/");
            return <div />;
        }

        return (
            <Login loginFunc={this.handleLoginDone} accountState={this.props.account}/>
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
        loginFunc: (username, password) => dispatch(loginUserAction(username, password)),
    };
};

const LoginContainer = connect(
    mapStateToProps, 
    mapDispatchToProps,    
) (LoginCont);

export default LoginContainer;