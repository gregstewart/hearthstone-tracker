import { stats, winStreak } from '../scripts/validators';
import React, { Component } from 'react';
import Stats from './stats';
import WinStreaks from './win-streaks';

class Main extends Component {
  render () {
    return (
      <div>
        <h1>Stats</h1>
        <Stats data={this.props.stats} />
        <h1>Win Streak</h1>
        <WinStreaks data={this.props.winStreak} />
      </div>
    );
  }
}

Main.propTypes = {
  stats,
  winStreak
};

export default Main;
