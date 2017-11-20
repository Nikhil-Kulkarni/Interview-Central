import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './textbox.css';

export default class Textbox extends Component {
    static propTypes = {
        name: PropTypes.string.isRequired,
        placeholder: PropTypes.string
    }

    render() {
        const {
            name,
            placeholder,
        } = this.props;

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
