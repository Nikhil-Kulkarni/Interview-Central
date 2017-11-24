import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import './logoutbar.css';

export default class LogoutBar extends Component {
    static propTypes = {
        loggedIn: PropTypes.bool.isRequired,
    }

    render() {
        return (
            <div className='logoutContainer'>
                <div className="logoutText">
                    {this.props.loggedIn ? <Link className='logLink' to="/login">Logout</Link> : <Link className='logLink' to="/login">Login</Link>}
                </div>
            </div>
        );
    }
}
