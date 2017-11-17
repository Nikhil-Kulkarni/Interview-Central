import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './tile.css';

export default class Tile extends Component {
    static propTypes = {
        questionName: PropTypes.string.isRequired,
        questionDescription: PropTypes.string.isRequired,
        type: PropTypes.string.isRequired,
    }

    componentWillMount() {
    }

    render() {
        const {
            questionName,
            questionDescription,
        } = this.props;

        return (
            <div className={this.props.type === "BIG" ? 'big' : 'small'}>
                <h5 className='boxText'>{questionName}</h5>
                <h6 className='boxText'>{questionDescription}</h6>
            </div>
        );
    }
}