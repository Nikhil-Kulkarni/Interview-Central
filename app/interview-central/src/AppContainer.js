import React, { Component } from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';
import App from './App';
import { getQuestions, getSuccess } from './state/questions/questionsSelectors';
import { getQuestionsAction } from './state/questions/questionsActions';
import { getHomeData } from './state/home/homeSelectors';
import { getAccountInfo } from './state/account/accountSelectors';
import { callCreateSuiteAPI } from './state/suites/suitesActions';
import { getHomeDataAction } from './state/home/homeActions';
import { getRecommendedCategory } from './state/recommended/recommendedSelectors';

export class AppCont extends Component {

    componentWillMount() {
        this.handleSaveSuite = this.handleSaveSuite.bind(this);
        this.refreshPageInfo = this.refreshPageInfo.bind(this);
    }

    handleSaveSuite(suiteListIds, suiteName) {
        callCreateSuiteAPI(suiteName, this.props.account.username, suiteListIds)
            .then(response => {
                console.log("Response");
                return response.json();
            }).then(json => {
                console.log("JSON");
                console.log(json);
                this.refreshPageInfo();
            });
    }

    refreshPageInfo() {
        this.props.getHomeDataAction(this.props.account.username);
    }

    render() {
        const items = this.props.questions.questions;
        const mySuite = this.props.homeData.mySuite;
        const recommended = this.props.homeData.recommended;


        if (this.props.success) {
            let recommendedQuestions = _.filter(items.questions.Items, question => question.category === this.props.getRecommendedCategory);
            let randomQuestion = recommendedQuestions[Math.floor((Math.random() * recommendedQuestions.length))];            
        
            return (
                <App
                    questions={items.questions.Items}
                    mySuite={mySuite}
                    recommended={recommended ? recommended : []}
                    loggedIn={this.props.account ? this.props.account.success : false}
                    saveSuite={this.handleSaveSuite}
                    recommendedQuestion={randomQuestion}/>
            );
        } else {
            return (
                <div>
                    <App
                    questions={[]}
                    mySuite={[]}
                    recommended={[]}
                    loggedIn={this.props.account ? this.props.account.success : false}
                    saveSuite={this.handleSaveSuite}/>
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
        getRecommendedCategory: getRecommendedCategory(state),
    };
};

const mapDispatchToProps = function(dispatch) {
    return {
        getQuestions: dispatch(getQuestionsAction()),
        getHomeDataAction: (username) => dispatch(getHomeDataAction(username)),
    };
};

const AppContainer = connect(
    mapStateToProps,
    mapDispatchToProps,
) (AppCont);

export default AppContainer;
