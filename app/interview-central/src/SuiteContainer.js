import _ from 'lodash';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import Suite from './Suite';
import { getSuite } from './state/suites/suitesActions';
import { getQuestions } from './state/questions/questionsSelectors';
import { getAccountInfo } from './state/account/accountSelectors';
import { getQuestionsAction } from './state/questions/questionsActions';

export class SuiteCont extends Component {

    componentWillMount() {
        this.state = {
            suite: {},
        }
    }

    componentDidMount() {
        this.setSuite();        
    }

    setSuite() {
        getSuite(this.props.match.params.suiteId)
            .then(response => {
                return response.json();
            }).then(json => {
                this.setState({suite: json});
            });
    }

    render() {
        if (this.state.suite.questions && this.props.questions.questions) {
            let items = this.props.questions.questions.questions.Items;        
            let questions = _.filter(items, question => this.state.suite.questions.includes(question.name)); 
            let suite = {
                suiteName: this.state.suite.suiteName,
                questions: questions,
            };

            return (
                <div>
                    <Suite suite={suite} loggedIn={this.props.account.success}/>
                </div>
            );
        }

        return (
            <div>
                <Suite suite={{}} loggedIn={false}/>
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

const mapDispatchToProps = function(dispatch, ownProps) {
    return {
        getQuestions: dispatch(getQuestionsAction()),        
    };
};

const SuiteContainer = connect(
    mapStateToProps, 
    mapDispatchToProps,    
) (SuiteCont);

export default SuiteContainer;