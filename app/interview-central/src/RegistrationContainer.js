import React, { Component } from 'react';
import { connect } from 'react-redux';
import Registration from './Registration';
import { registerUserAction, registerUserAPI } from './state/account/accountActions';
import { getAccountInfo } from './state/account/accountSelectors';

export class RegistrationCont extends Component {

    componentWillMount() {
        this.handleRegistrationDone = this.handleRegistrationDone.bind(this);
    }

    handleRegistrationDone(username, password) {
        // this.props.registrationFunc(username, password);
        registerUserAPI(username, password)
            .then(response => {
                return response.json();
            }).then(json => {
                this.props.history.push("/login");
            });

    }

    render() {
        const account = this.props.account;
        if (account.done && account.success) {
            this.props.history.push("/");
            return <div />
        }

        return (
            <Registration registrationFunc={this.handleRegistrationDone} accountState={this.props.account}/>
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
        registrationFunc: (username, password) => dispatch(registerUserAction(username, password)),
    };
};

const RegistrationContainer = connect(
    mapStateToProps,
    mapDispatchToProps,
) (RegistrationCont);

export default RegistrationContainer;
