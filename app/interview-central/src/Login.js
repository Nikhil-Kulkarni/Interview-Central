import React, { Component } from 'react';
import Textbox from './views/textbox/textbox';
import './Login.css';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import FacebookLogin from 'react-facebook-login';

export default class Login extends Component {

    static propTypes = {
        loginFunc: PropTypes.func.isRequired,
        loginFBFunc: PropTypes.func.isRequired,
        accountState: PropTypes.object.isRequired,
    }

    componentWillMount() {
        this.login.bind(this);
        this.responseFacebook = this.responseFacebook.bind(this);
    }

    login(event) {
        event.preventDefault();
        let username = event.target.username.value;
        let password = event.target.password.value;

        this.props.loginFunc(username, password);
    }

    responseFacebook(response) {
        let userID = response.userID;
        this.props.loginFBFunc(userID);
    }

    render() {
        return (
            <div className="Login">
                <div className='headerTitle'>INTERVIEW CENTRAL</div>
                <form onSubmit={this.login.bind(this)}>
                    <div className="box">
                        <Textbox name="username" placeholder="Username" password={false} />
                    </div>
                    <div className="box">
                        <Textbox name="password" placeholder="Password" password={true} />                
                    </div>
                    <div className="loginDiv">
                        <button className="loginButton">LOGIN</button>
                    </div>
                </form>
                <Button />
                <div className="fbLogin">
                    <FacebookLogin
                        appId="1928978060689017"
                        autoLoad={false}
                        fields="name,email,picture"
                        callback={this.responseFacebook} 
                    />
                </div>
            </div>
        );
    }
}

const Button = withRouter(({ history }) => (
    <div className="registerDiv">
        <button
            className="loginButton"
            onClick={() => { history.push('/register') }}
        > REGISTER </button>
    </div>
));
  