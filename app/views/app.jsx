import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import Main from './main';

export default class App extends Component {
  render () {
    const { stats } = this.props;
    return (
      <Main stats={stats} />
    );
  }
}

function select (state) {
  return {
    stats: state.summaryStats
  };
}

// Wrap the component to inject dispatch and state into it
export default connect(select)(App);

App.propTypes = {
  stats: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired,
    label: PropTypes.string,
    text: PropTypes.string,
    map: PropTypes.func
  }))
};
