import React, { Component } from 'react';
import './App.css';
import Tile from './views/tile/tile';
import LogoutBar from './views/topbar/components/logoutbar';
import PropTypes from 'prop-types';
import { Row, Col } from 'react-flexbox-grid';
import Textbox from './views/textbox/textbox';
import _ from 'lodash';

export class App extends Component {

  static propTypes = {
    questions: PropTypes.array.isRequired,
    mySuite: PropTypes.array.isRequired,
    recommended: PropTypes.array.isRequired,
    loggedIn: PropTypes.bool.isRequired,
    saveSuite: PropTypes.func,
  };

  componentWillMount() {
    this.state = {
      searchTerm: '',
      currentlyDisplayed: this.props.questions,
      newlyDisplayed: this.props.questions,
      showSearch: false,
      createSuite: false,
      suiteListIds: [],
      newSuiteName: "",
    };

    this.onInputChange = this.onInputChange.bind(this);
    this.handleSearch = this.handleSearch.bind(this);
    this.handleToggleCreateSuite = this.handleToggleCreateSuite.bind(this);
    this.handleCheckChangeFunc = this.handleCheckChangeFunc.bind(this);
    this.handleTextBoxChange = this.handleTextBoxChange.bind(this);
    this.handleSetHomeState = this.handleSetHomeState.bind(this);
  }

  onInputChange(event) {
    if (event.target.value !== "") {
        let newlyDisplayed = _.filter(this.props.questions, question => question.name.toLowerCase().includes(event.target.value.toLowerCase())
         || question.description.toLowerCase().includes(event.target.value.toLowerCase()));

        this.setState({
          searchTerm: event.target.value,
          newlyDisplayed: newlyDisplayed,
        });
    } else {
        this.setState({
            searchTerm: '',
            currentlyDisplayed: this.props.questions,
            showSearch: false,
        });
    }

  }

  handleSearch() {
      if (this.state.searchTerm !== '') {
          let newlyDisplayed = this.state.newlyDisplayed;
          this.setState({
              currentlyDisplayed: newlyDisplayed,
              showSearch: true,
          });
      }

  }

  handleToggleCreateSuite(curState) {
      // If curState is false, save the suite
      if (!curState) {
          var tempSuiteIds = this.state.suiteListIds;
          var tempSuiteName = this.state.newSuiteName;
          this.setState({
              suiteListIds: [],
              newSuiteName: "",
          });
          this.props.saveSuite(tempSuiteIds, tempSuiteName);
      }
      this.setState({
          createSuite: curState,
      });
  }

  handleCheckChangeFunc(id) {
      var idIndex = this.state.suiteListIds.indexOf(id)
      if (idIndex === -1) {
          this.state.suiteListIds.push(id);
      } else {
          this.state.suiteListIds.splice(idIndex, 1);
      }
  }

  handleTextBoxChange(value) {
      this.setState({
          newSuiteName: value,
      });
  }

  handleSetHomeState() {
      this.setState({
          createSuite: false,
      });
  }

  render() {
    let recommendedIds = _.map(this.props.recommended, recommendation => recommendation.questionId);
    let recommendedQuestions = _.filter(this.props.questions, question => recommendedIds.includes(question.id));

    return (
      <div className="App">
        <LogoutBar loggedIn={this.props.loggedIn} createSuite={this.state.createSuite} toggleCreateSuite={this.handleToggleCreateSuite} setHomeState={this.handleSetHomeState}/>
        <div className='title'>INTERVIEW CENTRAL</div>
        <input type="text" placeholder="SEARCH" className='search' onChange={this.onInputChange} onKeyPress={event => {
              if (event.key === "Enter") {
                this.handleSearch();
              }
            }}/>
        <button className="searchButton" onClick={this.handleSearch}>SEARCH</button>
        {this.state.showSearch || this.state.createSuite ?
            <div>
                {this.state.createSuite ?
                    <div>
                        <div className='header'> Suite Name</div>
                        <Textbox className="suiteNameBox" name="suiteName" placeholder="Enter Suite Name" password={false} handleChange={this.handleTextBoxChange}/>
                    </div> : null}
                {this.state.currentlyDisplayed.map((question, index) =>
                  <Tile
                    name={question.name}
                    description={question.description}
                    type="BIG"
                    tileLink={question.link}
                    linkId={`/question/${question.id}`}
                    key={index}
                    createSuite={this.state.createSuite}
                    checkChangeFunc={this.handleCheckChangeFunc}
                    suiteIds={this.state.suiteListIds}
                    question={question}
                  />
                )}
            </div>

            :

            <Row around="xs">

              <Col xs={6}>
                <Row>
                  <Col xs={12}>
                    <div className='header'>MY SUITES</div>
                    {this.props.loggedIn ?
                      this.props.mySuite.map((curSuite, index) =>
                        <Row center="xs" key={index}>
                          <Col xs={6}>
                            <Tile
                              name={curSuite.suiteName}
                              description={curSuite.questions.join()}
                              type="SMALL"
                              key={index}
                              linkId={`/suite/${curSuite.suiteId}`}
                              createSuite={this.state.createSuite}
                              checkChangeFunc={this.handleCheckChangeFunc}
                              question={{}}
                              deleteSuite={true}
                            />
                          </Col>
                        </Row>
                      )
                    :
                    <div className="loginRequest">Login to View Suites</div>}
                  </Col>
                </Row>
              </Col>

              <Col xs={6}>
                <Row>
                  <Col xs={12}>
                    <div className='header'>RECOMMENDED</div>
                    {this.props.loggedIn ?
                      this.props.recommended.map((recommendation, index) =>
                        <Row center="xs" key={index}>
                          <Col xs={6}>
                            <Tile
                              name={recommendedQuestions[index].name + ` - by ${recommendation.username}`}
                              description={recommendedQuestions[index].description}
                              type="SMALL"
                              key={index}
                              tileLink={recommendedQuestions[index].link}
                              linkId={`/question/${recommendedQuestions[index].id}`}
                              question={recommendedQuestions[index]}
                              />
                          </Col>
                        </Row>
                      )
                    :
                    <div className="loginRequest">Login to View Recommended</div>}
                  </Col>
                </Row>
              </Col>

            </Row>
        }
      </div>
    );
  }
}

export default App;
