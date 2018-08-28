import React from 'react';
import ReactDOM from 'react-dom';
import { Provider, Client } from 'urql';
import './index.css';
import App from './components/App';
import registerServiceWorker from './registerServiceWorker';

const client = new Client({
  url: 'http://localhost:8093/graphql'
});

const AppWithProvider = () => (
  <Provider client={client}>
    <App />
  </Provider>
);

ReactDOM.render(<AppWithProvider />, document.getElementById('root'));
registerServiceWorker();
