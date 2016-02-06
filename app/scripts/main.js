import { createStore } from 'redux';
import { ipcRenderer } from 'electron';
import { Provider } from 'react-redux';
import { render } from 'react-dom';
import { updateStats } from './actions/stats';
import App from '../views/app.jsx';
import React from 'react';
import stats from './reducers/stats';

let store = createStore(stats);
let rootElement = document.getElementById('main');

ipcRenderer.on('ping', function (event, message) {
  /*eslint-disable no-console */
  console.log(message);  // logs data
  store.dispatch(updateStats(message));
});

render(
  <Provider store={store}>
    <App />
  </Provider>,
  rootElement
);
