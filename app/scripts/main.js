import mori from 'mori';
import React from 'react';
import ReactDOM from 'react-dom';
import Main from '../views/main.jsx';
import {ipcRenderer} from 'electron';

let data = [
  {id: 1, label: "Wins", text: "10"},
  {id: 2, label: "Losses", text: "5"},
  {id: 3, label: "Ratio", text: "66%"}
];

ipcRenderer.on('ping', function(event, message) {
  data = message;  // logs message
  console.log(message);  // logs data
});

ReactDOM.render(<Main data={data} />, document.getElementById('main'));
