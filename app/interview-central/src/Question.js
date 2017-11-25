import React, { Component } from 'react';
import PropTypes from 'prop-types';
import LogoutBar from './views/topbar/components/logoutbar';
import './Question.css';
import {
    ShareButtons,
    generateShareIcon,
  } from 'react-share';

const {
    FacebookShareButton,
} = ShareButtons;

const FacebookIcon = generateShareIcon('facebook');

export default class Question extends Component {

    static propTypes = {
        question: PropTypes.object.isRequired,
        loggedIn: PropTypes.bool.isRequired,
    }

    componentWillMount() {
    }

    render() {
        const question = this.props.question;

        return (
            <div className="questionContainer">
                <LogoutBar loggedIn={this.props.loggedIn} createSuite={false} toggleCreateSuite={this.handleToggleCreateSuite}/>
                <div className='title'>{question.name}</div>
                <div className="questionBox">
                    <div className="questionBoxContents">
                        <h3>Description</h3>
                        <p className="questionBoxText">{question.description}</p>
                        <h3>Difficulty</h3>
                        <p className="questionBoxText">{question.difficulty}</p>
                        <h3>Submissions</h3>
                        <p className="questionBoxText">{question.submissions}</p>
                        <h3>Tags</h3>
                        <p className="questionBoxText">{question.tags}</p>
                        <h3>Link</h3>
                        <a href={question.link} className="questionBoxLink">{question.link}</a>
                    </div>
                    <div className='shareLink'>
                    <FacebookShareButton
                        url={question.link}
                        quote="I attempted this question from Interview-Central" 
                    >
                        <FacebookIcon size={32} round />
                    </FacebookShareButton>  
                </div>
                </div>
            </div>
        );
    }

}