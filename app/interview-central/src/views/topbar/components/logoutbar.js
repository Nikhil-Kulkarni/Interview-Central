import React, { Component } from 'react';
import './logoutbar.css';

export default class LogoutBar extends Component {
    render() {
        return (
            <div className='logoutContainer'>
                <p className='logoutText'>Logout</p>
            </div>
        );
    }
}
