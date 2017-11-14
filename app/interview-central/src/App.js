import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import BigTile from './views/bigtile/bigtile';
import PropTypes from 'prop-types';

export class App extends Component {

  static propTypes = {
    questions: PropTypes.array.isRequired,
  };

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>

        {this.props.questions.map((question, index) =>
          <BigTile
            questionName={question.name}
            questionDescription={question.description}
          />
        )}
      </div>
    );
  }
}

export default App;
