import React, { Component } from 'react';
import { connect } from 'react-redux';
import App from './App';
import { getQuestions, getSuccess } from './state/questions/questionsSelectors';
import { getQuestionsAction } from './state/questions/questionsActions';
import { getHomeData } from './state/home/homeSelectors';
import { getAccountInfo } from './state/account/accountSelectors';
import { callCreateSuiteAPI } from './state/suites/suitesActions';

export class AppCont extends Component {

    componentWillMount() {
        this.handleSaveSuite = this.handleSaveSuite.bind(this);
    }

    handleSaveSuite(suiteListIds) {
        callCreateSuiteAPI("testSuiteName", this.props.account.username, suiteListIds)
            .then(response => {
                console.log("Response");
                return response.json();
            }).then(json => {
                console.log("JSON");
                console.log(json);
            });
    }

    render() {
        const items = this.props.questions.questions;
        const mySuite = this.props.homeData.mySuite;

        if (this.props.success) {
            return (
                <App questions={items.questions.Items} mySuite={mySuite} recommended={[]} loggedIn={this.props.account ? this.props.account.success : false} saveSuite={this.handleSaveSuite}/>
            );
        } else {
            return (
                <div>
                    <App questions={[]} mySuite={[]} recommended={[]} loggedIn={this.props.account ? this.props.account.success : false} saveSuite={this.handleSaveSuite}/>
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
    };
};

const AppContainer = connect(
    mapStateToProps,
    mapDispatchToProps,
) (AppCont);

export default AppContainer;
