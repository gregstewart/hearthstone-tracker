import React from 'react';
import ReactDOM from 'react-dom';
import Main from '../views/main.jsx';

let data = [
  {id: 1, label: "Wins", text: "10"},
  {id: 2, label: "Losses", text: "5"},
  {id: 3, label: "Ratio", text: "66%"}
];

ReactDOM.render(<Main data={data} />, document.getElementById('main'));
