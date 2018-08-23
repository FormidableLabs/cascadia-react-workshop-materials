import React, { Component } from 'react';
import './App.css';
import Header from './Header';
import Home from '../pages/Home';
import Checkout from '../pages/Checkout';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Header />
        {/* <Home /> */}
        <Checkout />
      </div>
    );
  }
}

export default App;
