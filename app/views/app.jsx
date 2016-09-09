import { connect } from 'react-redux';
import { summaryStats, winStreak, matchBreakdown } from '../scripts/validators';
import React, { Component } from 'react';
import Main from './main';

export class App extends Component {
  render () {
    const { matchBreakdown, summaryStats, winStreak } = this.props;
    return (
      <Main matchBreakdown={matchBreakdown} summaryStats={summaryStats} winStreak={winStreak} />
    );
  }
}

function mapStateToProps (state) {
  let props = {
    matchBreakdown: state.matchBreakdown,
    summaryStats: state.summaryStats,
    winStreak: state.winStreak
  };
  return props;
}

// Wrap the component to inject dispatch and state into it
export default connect(mapStateToProps)(App);

App.propTypes = {
  matchBreakdown,
  summaryStats,
  winStreak
};
