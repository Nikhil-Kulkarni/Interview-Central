import _ from 'lodash';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import Question from './Question';
import { getQuestions } from './state/questions/questionsSelectors';
import { getAccountInfo } from './state/account/accountSelectors';
import { getQuestionWithIdAPI, getSentiment, increaseQuestionCount } from './state/questions/questionsActions';
import { viewedQuestionCategoryAPI } from './state/recommended/recommendedActions';

export class QuestionCont extends Component {

    componentWillMount() {
        this.state = {
            question: {},
            sentiment: {},
        }
        this.handleLinkClick = this.handleLinkClick.bind(this);
        this.setSentiment = this.setSentiment.bind(this);
        this.handleLeaderClick = this.handleLeaderClick.bind(this);
    }

    componentDidMount() {
        this.setQuestion();
    }

    setQuestion() {
        getQuestionWithIdAPI(this.props.match.params.questionId)
            .then(response => {
                return response.json();
            }).then(json => {
                this.setState({question: json});
                this.setSentiment();
            });
    }

    setSentiment() {
        let chosenQuestion = this.state.question.category;
        if (this.state.question.category === 'String/Array') {
            chosenQuestion = 'String Array';
        }
        getSentiment(chosenQuestion, this.state.question.name)
            .then(response => {
                return response.json();
            }).then(json => {
                this.setState({sentiment: json});
            });
    }

    handleLinkClick(username, category) {
        viewedQuestionCategoryAPI(username, category)
            .then(response => {
                return response.json();
            }).then(json => {
            });
    }

    handleLeaderClick(name) {
        increaseQuestionCount(name)
            .then(response => {
                return response.json();
            }).then(json => {
            });
    }

    render() {
        if (this.state.question) {
            return (
                <div>
                    <Question question={this.state.question} loggedIn={this.props.account.success}
                        username={this.props.account.username} linkClick={this.handleLinkClick} sentiment={this.state.sentiment} leaderClick={this.handleLeaderClick}/>
                </div>
            );
        }

        return (
            <div>
                <Question question={{}} loggedIn={this.props.account.success}/>
            </div>
        );
    }
}

const mapStateToProps = function(state) {
    return {
        questions: getQuestions(state),
        account: getAccountInfo(state),
    };
};

const mapDispatchToProps = function(dispatch) {
    return {
    };
};

const QuestionContainer = connect(
    mapStateToProps,
    mapDispatchToProps,
) (QuestionCont);

export default QuestionContainer;
