import _ from 'lodash';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import Question from './Question';
import LogoutBar from './views/topbar/components/logoutbar';
import { getQuestions } from './state/questions/questionsSelectors';
import { getAccountInfo } from './state/account/accountSelectors';
import { getQuestionLeaderboard } from './state/questions/questionsActions';
import { viewedQuestionCategoryAPI } from './state/recommended/recommendedActions';
import ReactTable from 'react-table';
import "react-table/react-table.css";

export class TopQuestionsCont extends Component {

    componentWillMount() {
        this.state = {
            topQuestions: [],
        }
        this.getLeaderboard = this.getLeaderboard.bind(this);
    }

    componentDidMount() {
        setInterval(this.getLeaderboard, 1000);
    }

    getLeaderboard() {
        getQuestionLeaderboard()
            .then(response => {
                return response.json();
            }).then(json => {
                this.setState({
                    topQuestions: json,
                });
            });
    }

    render() {
        return(

            <div className="App">
                  <LogoutBar
                      loggedIn={this.props.account ? this.props.account.success : false}/>
                  <div className='title'>INTERVIEW CENTRAL</div>
                  <ReactTable
                      data={this.state.topQuestions}
                      columns={[
                          {
                              Header: "Question Name",
                              accessor: "name"
                          },
                          {
                              Header: "View Count",
                              accessor: "numClicks"
                          }
                      ]}
                      className="questionLeaderboard -striped -highlight"/>
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

const TopQuestionsContainer = connect(
    mapStateToProps,
    mapDispatchToProps,
) (TopQuestionsCont);

export default TopQuestionsContainer;
