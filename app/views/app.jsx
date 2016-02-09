import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
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
  stats: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired,
    label: PropTypes.string,
    text: PropTypes.string,
    map: PropTypes.func
  })),
  winStreak: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired,
    label: PropTypes.string,
    as: PropTypes.string,
    against: PropTypes.string,
    map: React.PropTypes.func
  }))
};
