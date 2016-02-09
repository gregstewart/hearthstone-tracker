import React, { Component, PropTypes } from 'react';
import Stats from './stats';

class Main extends Component {
  render () {
    return (
      <div>
        <h1>Stats</h1>
        <Stats data={this.props.stats} />
      </div>
    );
  }
}

Main.propTypes = {
  stats: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired,
    label: PropTypes.string,
    text: PropTypes.string,
    map: PropTypes.func
  }))
};

export default Main;
