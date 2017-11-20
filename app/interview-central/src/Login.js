import React, { Component } from 'react';
import Textbox from './views/textbox/textbox';
import './Login.css';

export default class Login extends Component {

    componentWillMount() {
    }

    render() {
        return (
            <div className="Login">
                <div className='headerTitle'>INTERVIEW CENTRAL</div>
                <div className="box">
                    <Textbox name="Username" placeholder="Username" />
                </div>
                <div className="box">
                    <Textbox name="Password" placeholder="Password" />                
                </div>
            </div>
        );
    }

}