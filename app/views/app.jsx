import { connect } from 'react-redux';
import { stats, winStreak } from '../scripts/validators';
import React, { Component } from 'react';
import Main from './main';

export default class App extends Component {
  render () {
    const { stats, winStreak } = this.props;
    return (
      <Main stats={stats} winStreak={winStreak} />
    );
  }
}

function mapStateToProps (state) {
  let props = {
    stats: state.stats.summaryStats,
    winStreak: state.winStreak.winStreak
  };
  return props;
}

// Wrap the component to inject dispatch and state into it
export default connect(mapStateToProps)(App);

App.propTypes = {
  stats,
  winStreak
};
