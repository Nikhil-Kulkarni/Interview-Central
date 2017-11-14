import React, { Component } from 'react';
import './App.css';
import BigTile from './views/bigtile/bigtile';
import LogoutBar from './views/topbar/components/logoutbar';
import PropTypes from 'prop-types';


export class App extends Component {

  static propTypes = {
    questions: PropTypes.array.isRequired,
  };

  render() {
    return (
      <div className="App">
        <LogoutBar/>
        <div className='title'>INTERVIEW CENTRAL</div>
        {this.props.questions.map((question, index) =>
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
