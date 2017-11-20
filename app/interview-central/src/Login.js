import React, { Component } from 'react';
import Textbox from './views/textbox/textbox';
import './Login.css';
import PropTypes from 'prop-types';

export default class Login extends Component {

    static propTypes = {
        loginFunc: PropTypes.func.isRequired,
    }

    componentWillMount() {
        this.login.bind(this);
    }

    login(event) {
        event.preventDefault();
        let username = event.target.username.value;
        let password = event.target.password.value;

        this.props.loginFunc(username, password);
    }

    render() {
        return (
            <div className="Login">
                <div className='headerTitle'>INTERVIEW CENTRAL</div>
                <form onSubmit={this.login.bind(this)}>
                    <div className="box">
                        <Textbox name="username" placeholder="Username" />
                    </div>
                    <div className="box">
                        <Textbox name="password" placeholder="Password" />                
                    </div>
                    <div className="loginDiv">
                        <button className="loginButton">LOGIN</button>
                    </div>
                </form>
            </div>
        );
    }

}