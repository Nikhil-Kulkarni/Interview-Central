import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import BigTile from './views/bigtile/bigtile';
import LogoutBar from './views/topbar/components/logoutbar';

export class App extends Component {
  render() {
    return (
      <div className="App">
        <LogoutBar/>

        <BigTile
            questionName={'Test Name'}
            questionDescription={'Test Description'}
        />
      </div>
    );
  }
}

export default App;
