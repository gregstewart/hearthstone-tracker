import { createStore } from 'redux';
import { ipcRenderer } from 'electron';
import { Provider } from 'react-redux';
import { render } from 'react-dom';
import { updateStats } from './actions/stats';
import { updateWinStreak } from './actions/win-streak';
import App from '../views/app.jsx';
import React from 'react';
import reducer from './reducers/index';

let store = createStore(reducer);
let rootElement = document.getElementById('main');

ipcRenderer.on('ping', function (event, message) {
  /*eslint-disable no-console */
  console.log(message);  // logs data
  store.dispatch(updateStats(message));
  store.dispatch(updateWinStreak(message));
});

render(
  <Provider store={store}>
    <App />
  </Provider>,
  rootElement
);
