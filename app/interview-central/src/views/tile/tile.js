import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './tile.css';

export default class Tile extends Component {
    static propTypes = {
        suiteName: PropTypes.string.isRequired,
        suiteQuestionNames: PropTypes.string.isRequired,
        type: PropTypes.string.isRequired,
    }

    componentWillMount() {
    }

    render() {
        const {
            suiteName,
            suiteQuestionNames,
        } = this.props;

        return (
            <div className={this.props.type === "BIG" ? 'big' : 'small'}>
                <h5 className='boxText'>{suiteName}</h5>
                <h6 className='boxText'>{suiteQuestionNames}</h6>
            </div>
        );
    }
}
