import React, { Component } from 'react';
import { connect } from 'react-redux';
import App from './App';
import { getQuestions, getSuccess } from './state/questions/questionsSelectors';
import { getQuestionsAction } from './state/questions/questionsActions';
import { getHomeData } from './state/home/homeSelectors';
import { getHomeDataAction } from './state/home/homeActions';
import { getAccountInfo } from './state/account/accountSelectors';

export class AppCont extends Component {

    componentWillMount() {
    }

    render() {
        const items = this.props.questions.questions;
        const mySuite = this.props.homeData.mySuite;
        if (this.props.account.username) {
            this.props.getHomeData(this.props.account.username);        
        }

        if (this.props.success && this.props.account.done) {
            return (
                <App questions={items.questions.Items} mySuite={mySuite} recommended={[]}/>
            );
        } else {
            return (
                <div>
                    <App questions={[]} mySuite={[]} recommended={[]}/>
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
        account: getAccountInfo(state),
    };
};

const mapDispatchToProps = function(dispatch) {
    return {
        getQuestions: dispatch(getQuestionsAction()),
        getHomeData: (username) => dispatch(getHomeDataAction(username)),
    };
};

const AppContainer = connect(
    mapStateToProps,
    mapDispatchToProps,
) (AppCont);

export default AppContainer;
