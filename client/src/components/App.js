import React, { Component } from 'react';
import './App.css';
import Header from './Header';
import Home from '../pages/Home';
import Checkout from '../pages/Checkout';
import Detail from '../pages/Detail';
import uuid from 'uuid4';

import { HOME, CHECKOUT, DETAIL } from '../utils/constants';

class App extends Component {
  state = {
    route: HOME
  };

  componentDidMount() {
    const session = localStorage.getItem('formidableSession');
    if (!session) {
      const id = uuid();
      localStorage.setItem('formidableSession', id);
    }
  }

  updateRoute = route => {
    this.setState({ route });
  };

  render() {
    return (
      <div className="App">
        <Header updateRoute={this.updateRoute} />
        {this.state.route === HOME && <Home />}
        {this.state.route === CHECKOUT && <Checkout />}
        {this.state.route === DETAIL && <Detail />}
      </div>
    );
  }
}

export default App;
