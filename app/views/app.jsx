import { connect } from 'react-redux';
import { summaryStats, winStreak } from '../scripts/validators';
import React, { Component } from 'react';
import Main from './main';

export default class App extends Component {
  render () {
    const { summaryStats, winStreak } = this.props;
    return (
      <Main summaryStats={summaryStats} winStreak={winStreak} />
    );
  }
}

function mapStateToProps (state) {
  let props = {
    summaryStats: state.summaryStats,
    winStreak: state.winStreak
  };
  return props;
}

// Wrap the component to inject dispatch and state into it
export default connect(mapStateToProps)(App);

App.propTypes = {
  summaryStats,
  winStreak
};
