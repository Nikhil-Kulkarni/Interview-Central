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
  };

  componentWillMount() {
    this.state = {
      searchTerm: '',
      currentlyDisplayed: this.props.questions,
      newlyDisplayed: this.props.questions,
      showSearch: false
    };

    this.onInputChange.bind(this);
    this.handleSearch = this.handleSearch.bind(this);
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

  render() {
    return (
      <div className="App">
        <LogoutBar/>
        <div className='title'>INTERVIEW CENTRAL</div>
        {/* TODO: SEARCH BAR GOES HERE */}
        <input type="text" placeholder="SEARCH" className='search' onChange={this.onInputChange.bind(this)} onKeyPress={event => {
              if (event.key === "Enter") {
                this.handleSearch();
              }
            }}/>
        <button className="searchButton" onClick={this.handleSearch}>SEARCH</button>
        {this.state.showSearch ?
            <div>
            {this.state.currentlyDisplayed.map((question, index) =>
              <Tile
                name={question.name}
                description={question.description}
                type="BIG"
                key={index}
              />
            )}
            </div>

            :

            <Row around="xs">

              <Col xs={6}>
                <Row>
                  <Col xs={12}>
                    <div className='header'>MY SUITES</div>
                    {this.props.mySuite.map((curSuite, index) =>
                      <Row center="xs" key={index}>
                        <Col xs={6}>
                          <Tile
                            name={curSuite.suiteName}
                            description={curSuite.questions.join()}
                            type="SMALL"
                            key={index}
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


        {/* TODO: ALL INTERVIEW QUESTIONS BELOW. SEARCHING ONLY WORKS ON THIS BC WE USING STATE.CURRENTLYDISPLAYED */}

      </div>
    );
  }
}

export default App;
