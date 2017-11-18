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
    };

    this.onInputChange.bind(this);
  }

  onInputChange(event) {
    let newlyDisplayed = _.filter(this.props.questions, question => question.name.toLowerCase().includes(event.target.value.toLowerCase())
     || question.description.toLowerCase().includes(event.target.value.toLowerCase()));

    this.setState({
      searchTerm: event.target.value,
      currentlyDisplayed: newlyDisplayed,
    });
  }

  render() {
    return (
      <div className="App">
        <LogoutBar/>
        <div className='title'>INTERVIEW CENTRAL</div>
        {/* TODO: SEARCH BAR GOES HERE */}
        <input type="text" placeholder="SEARCH" className='search' onChange={this.onInputChange.bind(this)} />
        <button className="searchButton">SEARCH</button>

        <Row around="xs">

          <Col xs={6}>
            <Row>
              <Col xs={12}>
                <div className='header'>MY SUITES</div>             
                {this.props.mySuite.map((question, index) =>
                  <Row center="xs" key={index}>
                    <Col xs={6}>
                      <Tile
                        questionName={question.name}
                        questionDescription={question.description}
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
                        questionName="Recommended"
                        questionDescription="This is an example of a recommended question"
                        type="SMALL"
                        />
                    </Col>
                  </Row>
              </Col>
            </Row>
          </Col>          

        </Row>

        {/* TODO: ALL INTERVIEW QUESTIONS BELOW. SEARCHING ONLY WORKS ON THIS BC WE USING STATE.CURRENTLYDISPLAYED */}
        {/* {this.state.currentlyDisplayed.map((question, index) =>
          <Tile
            questionName={question.name}
            questionDescription={question.description}
            type="BIG"
            key={index}
          />
        )} */}
      </div>
    );
  }
}

export default App;
