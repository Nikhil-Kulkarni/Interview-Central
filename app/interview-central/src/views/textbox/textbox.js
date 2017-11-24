import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './textbox.css';

export default class Textbox extends Component {
    static propTypes = {
        name: PropTypes.string.isRequired,
        placeholder: PropTypes.string,
        password: PropTypes.bool.isRequired,
    }

    render() {
        const {
            name,
            placeholder,
        } = this.props;

        if (this.props.password) {
            return (
                <div className="form-group">
                    <input
                        className="textbox"
                        name={name}
                        placeholder={placeholder}
                        type="password"
                     />
                </div>
            );
        }

        return (
            <div className="form-group">
                <input
                    className="textbox"
                    name={name}
                    placeholder={placeholder}
                 />
            </div>
        );
    }
}
