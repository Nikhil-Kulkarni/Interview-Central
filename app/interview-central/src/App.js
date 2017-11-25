import React, { Component } from 'react';
import './App.css';
import Tile from './views/tile/tile';
import LogoutBar from './views/topbar/components/logoutbar';
import PropTypes from 'prop-types';
import { Row, Col } from 'react-flexbox-grid';
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
    };

    this.onInputChange.bind(this);
    this.handleSearch = this.handleSearch.bind(this);
    this.handleToggleCreateSuite = this.handleToggleCreateSuite.bind(this);
    this.handleCheckChangeFunc = this.handleCheckChangeFunc.bind(this);
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
          this.setState({
              suiteListIds: [],
          });
          this.props.saveSuite(tempSuiteIds);
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
    //   console.log("Group List: " + this.state.suiteListIds);
  }

  render() {
    return (
      <div className="App">
        <LogoutBar loggedIn={this.props.loggedIn} createSuite={this.state.createSuite} toggleCreateSuite={this.handleToggleCreateSuite}/>
        <div className='title'>INTERVIEW CENTRAL</div>
        <input type="text" placeholder="SEARCH" className='search' onChange={this.onInputChange.bind(this)} onKeyPress={event => {
              if (event.key === "Enter") {
                this.handleSearch();
              }
            }}/>
        <button className="searchButton" onClick={this.handleSearch}>SEARCH</button>
        {this.state.showSearch || this.state.createSuite ?
            <div>
            {this.state.currentlyDisplayed.map((question, index) =>
              <Tile
                name={question.name}
                description={question.description}
                type="BIG"
                tileLink={question.link}
                key={index}
                createSuite={this.state.createSuite}
                checkChangeFunc={this.handleCheckChangeFunc}
              />
            )}
            </div>

            :

            <Row around="xs">

              <Col xs={6}>
                <Row>
                  <Col xs={12}>
                    <div className='header'>MY SUITES</div>
                    {this.props.loggedIn ? "" : <div className="loginRequest">Login to View Suites</div>}
                    {this.props.mySuite.map((curSuite, index) =>
                      <Row center="xs" key={index}>
                        <Col xs={6}>
                          <Tile
                            name={curSuite.suiteName}
                            description={curSuite.questions.join()}
                            type="SMALL"
                            key={index}
                            linkId={curSuite.suiteId}
                            createSuite={this.state.createSuite}
                            checkChangeFunc={this.handleCheckChangeFunc}
                          />
                        </Col>
                      </Row>
                    )}
                  </Col>
                </Row>
              </Col>

              <Col xs={6}>
                <Row>
                  <Col xs={12}>
                    <div className='header'>RECOMMENDED</div>
                    {this.props.loggedIn ? "" : <div className="loginRequest">Login to View Recommended</div>}                    
                    <Row center="xs">
                        <Col xs={6}>
                          <Tile
                            name="Recommended"
                            description="This is an example of a recommended question"
                            type="SMALL"
                            />
                        </Col>
                      </Row>
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
