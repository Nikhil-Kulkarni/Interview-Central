import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './Suite.css';
import LogoutBar from './views/topbar/components/logoutbar';
import Tile from './views/tile/tile';

export default class Suite extends Component {

    static propTypes = {
        suite: PropTypes.object.isRequired,
    }

    componentWillMount() {
    }

    render() {
        if (this.props.suite.questions) {
            return (
                <div className="Suite">
                    <LogoutBar/>
                    <div className='suiteName'>{this.props.suite.suiteName}</div>
                    {/* GET QUESTION DESCRIPTION FROM REDUX */}
                    {this.props.suite.questions.map((question, index) => 
                        <Tile
                            name={question}
                            description={question}
                            type="BIG"
                            key={index}
                        />
                    )}
                </div>
            );
        }
        return (
            <div>
                {/* TODO: RENDER LOADING SPINNER HERE */}
            </div>
        );
    }

}