import { createStore } from 'redux';
import { ipcRenderer, remote } from 'electron';
import { Provider } from 'react-redux';
import { render } from 'react-dom';
import { updateStats } from './actions/stats';
import { updateWinStreak } from './actions/win-streak';
import { updateMatchBreakdown } from './actions/match-breakdown';
import App from '../views/app.jsx';
import React from 'react';
import { reducers } from './reducers/index';

const initialState = {
  matchBreakdown: [
    { status: 'wins', outcomes: [] },
    { status: 'losses', outcomes: [] }
  ],
  summaryStats: {
    today: [
      {id: 1, label: "Wins", text: "0"},
      {id: 2, label: "Losses", text: "0"},
      {id: 3, label: "Ratio", text: "0%"}
    ],
    thisWeek: [
      {id: 1, label: "Wins", text: "0"},
      {id: 2, label: "Losses", text: "0"},
      {id: 3, label: "Ratio", text: "0%"}
    ],
    thisMonth: [
      {id: 1, label: "Wins", text: "0"},
      {id: 2, label: "Losses", text: "0"},
      {id: 3, label: "Ratio", text: "0%"}
    ],
    lastMonth: [
      {id: 1, label: "Wins", text: "0"},
      {id: 2, label: "Losses", text: "0"},
      {id: 3, label: "Ratio", text: "0%"}
    ],
    allTime: [
      {id: 1, label: "Wins", text: "0"},
      {id: 2, label: "Losses", text: "0"},
      {id: 3, label: "Ratio", text: "0%"}
    ]
  },
  winStreak: []
};

let store = createStore(reducers, initialState);
let rootElement = document.getElementById('main');
const { Menu, app } = remote;

ipcRenderer.on('ping', function (event, message) {
  /*eslint-disable no-console */
  console.log(message);  // logs data
  store.dispatch(updateStats(message.summaryStats));
  store.dispatch(updateWinStreak(message.winStreak));
  store.dispatch(updateMatchBreakdown(message.matchBreakdown));
});

let menu = Menu.buildFromTemplate([
  {
    label: 'Hearthstone Tracker',
    submenu: [
      {
        label: 'Reload data',
        accelerator: 'CmdOrCtrl+R',
        click: () => {
          ipcRenderer.send('reload-data');
        }
      },
      {
        label: 'Quit',
        accelerator: 'Command+Q',
        click: () => {
          app.quit();
        }
      }
    ]
  }
]);
Menu.setApplicationMenu(menu);

render(
  <Provider store={store}>
    <App />
  </Provider>,
  rootElement
);
