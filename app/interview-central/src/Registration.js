import React, { Component } from 'react';
import Textbox from './views/textbox/textbox';
import './Registration.css';
import PropTypes from 'prop-types';

export default class Registration extends Component {

    static propTypes = {
        registrationFunc: PropTypes.func.isRequired,
    }

    componentWillMount() {
        this.state = {
            matchingPasswords: true,
        }
        this.login.bind(this);
    }

    login(event) {
        event.preventDefault();
        let username = event.target.username.value;
        let password = event.target.password.value;
        let confirmPassword = event.target.confirmPassword.value;

        if (password === confirmPassword) {
            this.props.registrationFunc(username, password);
        } else {
            this.setState({
                matchingPasswords: false,
            });
        }

    }

    render() {
        return (
            <div className="Registration">
                <div className='headerTitle'>INTERVIEW CENTRAL</div>
                <form onSubmit={this.login.bind(this)}>
                    <div className="box">
                        <Textbox name="username" placeholder="Username" password={false} />
                    </div>
                    <div className="box">
                        <Textbox name="password" placeholder="Password" password={true} />
                    </div>
                    <div className="box">
                        <Textbox name="confirmPassword" placeholder="Confirm Password" password={true} />
                    </div>
                    <div className="loginDiv">
                        <button className="loginButton">REGISTER</button>
                    </div>
                </form>
                <div>
                    {!this.state.matchingPasswords ? <p className="matching-passwords">Passwords must match!</p> : null}
                </div>
            </div>
        );
    }

}
