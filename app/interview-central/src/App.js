import React, { Component } from 'react';
import './App.css';
import BigTile from './views/bigtile/bigtile';
import LogoutBar from './views/topbar/components/logoutbar';
import PropTypes from 'prop-types';
import _ from 'lodash';

export class App extends Component {

  static propTypes = {
    questions: PropTypes.array.isRequired,
  };

  componentWillMount() {
    this.state = {
      searchTerm: '',
      currentlyDisplayed: this.props.questions,
    };

    this.onInputChange.bind(this);
  }

  onInputChange(event) {
    let newlyDisplayed = _.filter(this.props.questions, question => question.name.toLowerCase().includes(event.target.value.toLowerCase()));

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
        <input type="text" onChange={this.onInputChange.bind(this)} />
        {this.state.currentlyDisplayed.map((question, index) =>
          <BigTile
            questionName={question.name}
            questionDescription={question.description}
            key={question.name}
          />
        )}
      </div>
    );
  }
}

export default App;
