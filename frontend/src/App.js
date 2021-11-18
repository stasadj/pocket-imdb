import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { createBrowserHistory } from 'history';

import './App.css';
import AppLayout from './component/AppLayout';
import store from './store/Store';
import './styles/css/bootstrap.min.css';

const history = createBrowserHistory();

const App = () => (
  <Provider store={store}>
    <BrowserRouter>
      <div>
        <AppLayout history={history} />
      </div>
    </BrowserRouter>
  </Provider>
);

export default App;
