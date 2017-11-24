import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './Suite.css';
import LogoutBar from './views/topbar/components/logoutbar';
import Tile from './views/tile/tile';

export default class Suite extends Component {

    static propTypes = {
        suite: PropTypes.object.isRequired,
        loggedIn: PropTypes.bool.isRequired,
    }

    componentWillMount() {
    }

    render() {
        if (this.props.suite.questions) {
            return (
                <div className="Suite">
                    <LogoutBar loggedIn={this.props.loggedIn} />
                    <div className='suiteName'>Suite: {this.props.suite.suiteName}</div>
                    {this.props.suite.questions.map((question, index) => 
                        <Tile
                            name={question.name}
                            description={question.description}
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