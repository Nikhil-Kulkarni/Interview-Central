import _ from 'lodash';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import Question from './Question';
import { getQuestions } from './state/questions/questionsSelectors';
import { getAccountInfo } from './state/account/accountSelectors';
import { getQuestionWithIdAPI } from './state/questions/questionsActions';

export class QuestionCont extends Component {

    componentWillMount() {
        this.state = {
            question: {},
        }
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
            });
    }

    render() {
        if (this.state.question) {
            return (
                <div>
                    <Question question={this.state.question} loggedIn={this.props.account.success}/>
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