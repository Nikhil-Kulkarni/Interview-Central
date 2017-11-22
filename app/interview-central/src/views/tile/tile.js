import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import './tile.css';

export default class Tile extends Component {
    static propTypes = {
        name: PropTypes.string.isRequired,
        description: PropTypes.string.isRequired,
        type: PropTypes.string.isRequired,
        linkId: PropTypes.string,
    }

    componentWillMount() {
    }

    render() {
        const {
            name,
            description,
        } = this.props;

        return (
            <div className={this.props.type === "BIG" ? 'big' : 'small'}>
                <h5 className='boxText'>{name}</h5>
                <h6 className='boxText'>{description}</h6>
                <div className='link'>
                    {this.props.linkId !== null ? <Link className='hyperlink' to={`/suite/${this.props.linkId}`}>More Info</Link> : <div />}
                </div>
            </div>
        );
    }
}
