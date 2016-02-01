import mori from 'mori';
import React from 'react';
import ReactDOM from 'react-dom';
import {createStore} from 'redux';
import Main from '../views/main.jsx';
import stats from './reducers/stats';
import {ipcRenderer} from 'electron';
import {updateStats} from './actions/stats';

let data = [
  {id: 1, label: "Wins", text: "0"},
  {id: 2, label: "Losses", text: "0"},
  {id: 3, label: "Ratio", text: "0%"}
];

let store = createStore(stats, data);

ipcRenderer.on('ping', function (event, message) {
  /*eslint-disable no-console */
  console.log(message);  // logs data
  store.dispatch(updateStats(message));
});

ReactDOM.render(<Main data={data} />, document.getElementById('main'));

window.store = store;
