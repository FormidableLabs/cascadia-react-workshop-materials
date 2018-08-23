import React, { Component } from 'react';
import './App.css';
import Header from './Header';
import Home from '../pages/Home';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Header />
        <Home />
      </div>
    );
  }
}

export default App;
