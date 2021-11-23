import React from 'react';
import { ConnectedRouter } from 'connected-react-router';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { createBrowserHistory } from 'history';

import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import AppLayout from './component/AppLayout';
import store from './store/Store';

const history = createBrowserHistory();

const App = () => (
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <BrowserRouter>
        <AppLayout history={history} />
      </BrowserRouter>
    </ConnectedRouter>
  </Provider>
);

export default App;
