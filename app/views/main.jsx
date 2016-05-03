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
    <h1>Breakdown of matches</h1>
    <ul>
      <li>
        <h2>Wins</h2>
        <ul>
          <li>Class | Wins: 2 | Percentage: xx%</li>
          <li>Class | Wins: 1 | Percentage: xx%</li>
        </ul>
      </li>
      <li>
        <h2>Losses</h2>
        <ul>
          <li>Class | Losses: 5 | Percentage: xx%</li>
          <li>Class | Losses: 3 | Percentage: xx%</li>
        </ul>
      </li>
    </ul>
  </div>
);

Main.propTypes = {
  summaryStats,
  winStreak
};

export default Main;
