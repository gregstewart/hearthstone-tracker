import * as types from '../constants/action-types';

const initialState = {
  summaryStats: [
    {id: 1, label: "Wins", text: "0"},
    {id: 2, label: "Losses", text: "0"},
    {id: 3, label: "Ratio", text: "0%"}
  ]
};

export default function (state = initialState, action) {
  if (action.type === types.UPDATE_STATS) {
    return Object.assign({}, state, {summaryStats: action.summaryStats}
    );
  }

  return state;
}
