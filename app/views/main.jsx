import { stats } from '../scripts/validators';
import React, { Component } from 'react';
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
  stats
};

export default Main;
