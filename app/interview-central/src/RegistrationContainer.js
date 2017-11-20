import React, { Component } from 'react';
import { connect } from 'react-redux';
import Registration from './Registration';
import { registerUserAction } from './state/account/accountActions';
import { getAccountInfo } from './state/account/accountSelectors';

export class RegistrationCont extends Component {

    componentWillMount() {
    }

    render() {
        return (
            <Registration registrationFunc={registerUserAction}/>
        );
    }
}

const mapStateToProps = function(state) {
    return {
        account: getAccountInfo(state),
    };
};

const RegistrationContainer = connect(
    mapStateToProps,
) (RegistrationCont);

export default RegistrationContainer;
