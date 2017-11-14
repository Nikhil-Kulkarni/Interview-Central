import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './bigtile.css';

export default class BigTile extends Component {
    static propTypes = {
        questionName: PropTypes.string.isRequired,
        questionDescription: PropTypes.string.isRequired
    }

    componentWillMount() {
    }

    render() {
        const {
            questionName,
            questionDescription,
        } = this.props;

        return (
            <div className='box'>
                <h5 className='boxText'>{questionName}</h5>
                <h6 className='boxText'>{questionDescription}</h6>
            </div>
        );
    }
}
