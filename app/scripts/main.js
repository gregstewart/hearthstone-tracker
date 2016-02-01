import mori from 'mori';
import React from 'react';
import { render } from 'react-dom';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import App from '../views/app.jsx';
import stats from './reducers/stats';
import {ipcRenderer} from 'electron';
import {updateStats} from './actions/stats';

let data = {
  summaryStats: [
    {id: 1, label: "Wins", text: "0"},
    {id: 2, label: "Losses", text: "0"},
    {id: 3, label: "Ratio", text: "0%"}
  ]
};

let store = createStore(stats, data);
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
