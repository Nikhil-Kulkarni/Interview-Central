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
        createSuite: PropTypes.bool,
        checkChangeFunc: PropTypes.func,
    }

    componentWillMount() {
        this.state = {
            checked: false,
        };

        this.onCheckChange = this.onCheckChange.bind(this);
    }

    onCheckChange() {
        this.setState({
            checked: !this.state.checked,
        });
        this.props.checkChangeFunc(this.props.name);
    }

    render() {
        const {
            name,
            description,
        } = this.props;

        return (
            <div className={this.props.type === "BIG" ? 'big' : 'small'}>
                <h5 className='boxText'>{name}</h5>
                {this.props.createSuite ? <input className='suiteCheck' type='checkbox' checked={this.state.checked} onChange={this.onCheckChange}/> : null}
                <h6 className='boxText'>{description}</h6>
                <div className='link'>
                    {this.props.linkId !== null ? <Link className='hyperlink' to={`/suite/${this.props.linkId}`}>More Info</Link> : <div />}
                </div>
            </div>
        );
    }
}
