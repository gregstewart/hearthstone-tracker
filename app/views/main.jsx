import { summaryStats, winStreak } from '../scripts/validators';
import React from 'react';
import Stats from './stats';
import WinStreaks from './win-streaks';

const Main = ({
  summaryStats, winStreak
}) => (
  <div>
    <h1>Stats</h1>
    <Stats data={summaryStats} />
    <h1>Win Streak</h1>
    <WinStreaks data={winStreak} />
  </div>
);

Main.propTypes = {
  summaryStats,
  winStreak
};

export default Main;
