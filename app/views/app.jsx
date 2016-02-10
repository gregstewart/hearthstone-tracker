import { connect } from 'react-redux';
import { stats, winStreak } from '../scripts/validators';
import React, { Component } from 'react';
import Stats from './stats';

export default class App extends Component {
  render () {
    const { stats, winStreak } = this.props;
    return (
      <Stats stats={stats} winStreak={winStreak} />
    );
  }
}

function mapStateToProps (state) {
  return {
    stats: state.summaryStats,
    winStreak: state.winStreak
  };
}

// Wrap the component to inject dispatch and state into it
export default connect(mapStateToProps)(App);

App.propTypes = {
  stats,
  winStreak
};
