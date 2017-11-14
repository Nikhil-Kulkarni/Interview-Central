import React, { Component } from 'react';
import { connect } from 'react-redux';
import App from './App';
import { getQuestions, getSuccess } from './state/questions/questionsSelectors';
import { getQuestionsAction } from './state/questions/questionsActions';

export class AppCont extends Component {
    
    componentWillMount() {
    }

    render() {
        const items = this.props.questions.questions;
        if (this.props.success) {
            return (
                <App questions={items.questions.Items}/>
            );
        } else {
            return (
                <App questions={[]}/>
            );
        }       
    }
}

const mapStateToProps = function(state) {
    return {
        questions: getQuestions(state),
        success: getSuccess(state),
    };
};

const mapDispatchToProps = function(dispatch) {
    return {
        getQuestions: dispatch(getQuestionsAction()),
    };
};

const AppContainer = connect(
    mapStateToProps,
    mapDispatchToProps,
) (AppCont);

export default AppContainer;