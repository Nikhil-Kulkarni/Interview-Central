import React, { Component } from 'react';
import { connect } from 'react-redux';
import App from './App';
import { getQuestions, getSuccess } from './state/questions/questionsSelectors';
import { getQuestionsAction } from './state/questions/questionsActions';
import { getHomeData } from './state/home/homeSelectors';
import { getHomeDataAction } from './state/home/homeActions';

export class AppCont extends Component {
    
    componentWillMount() {
    }

    render() {
        const items = this.props.questions.questions;
        const mySuite = this.props.homeData.mySuite;

        if (this.props.success) {
            return (
                <App questions={items.questions.Items}/>
            );
        } else {
            return (
                <div>
                    <App questions={[]}/>
                </div>
            );
        }       
    }
}

const mapStateToProps = function(state) {
    return {
        questions: getQuestions(state),
        success: getSuccess(state),
        homeData: getHomeData(state),
    };
};

const mapDispatchToProps = function(dispatch) {
    return {
        getQuestions: dispatch(getQuestionsAction()),
        getHomeData: dispatch(getHomeDataAction()),
    };
};

const AppContainer = connect(
    mapStateToProps,
    mapDispatchToProps,
) (AppCont);

export default AppContainer;