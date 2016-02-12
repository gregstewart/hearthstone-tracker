import { createStore } from 'redux';
import { ipcRenderer } from 'electron';
import { Provider } from 'react-redux';
import { render } from 'react-dom';
import { updateStats } from './actions/stats';
import { updateWinStreak } from './actions/win-streak';
import App from '../views/app.jsx';
import React from 'react';
import reducer from './reducers/index';

const initialState = {
  summaryStats: [
    {id: 1, label: "Wins", text: "0"},
    {id: 2, label: "Losses", text: "0"},
    {id: 3, label: "Ratio", text: "0%"}
  ],
  winStreak: []
};

let store = createStore(reducer, initialState);
let rootElement = document.getElementById('main');

ipcRenderer.on('ping', function (event, message) {
  /*eslint-disable no-console */
  console.log(message);  // logs data
  store.dispatch(updateStats(message.summaryStats));
  store.dispatch(updateWinStreak(message.winStreak));
});

render(
  <Provider store={store}>
    <App />
  </Provider>,
  rootElement
);
