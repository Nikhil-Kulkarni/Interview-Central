import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './textbox.css';

export default class Textbox extends Component {
    static propTypes = {
        name: PropTypes.string.isRequired,
        placeholder: PropTypes.string,
        password: PropTypes.bool.isRequired,
        handleChange: PropTypes.func,
    }

    componentWillMount() {
        this.state = {
            value: "",
        }
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(event) {
        this.setState({
            value: event.target.value,
        });
        var type = typeof this.props.handleChange;
        if (typeof this.props.handleChange !== 'undefined') {
            this.props.handleChange(event.target.value);
        }
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
                    onChange={this.handleChange}
                 />
            </div>
        );
    }
}
