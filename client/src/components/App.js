import React, { Component } from 'react';
import './App.css';
import Header from './Header';
import Home from '../pages/Home';
import Checkout from '../pages/Checkout';
import Detail from '../pages/Detail';
import uuid from 'uuid4';

class App extends Component {
  componentDidMount() {
    const session = localStorage.getItem('formidableSession');
    if (!session) {
      const id = uuid();
      localStorage.setItem('formidableSession', id);
    }
  }

  render() {
    return (
      <div className="App">
        <Header />
        {/* <Home /> */}
        {/* <Checkout /> */}
        <Detail />
      </div>
    );
  }
}

export default App;
