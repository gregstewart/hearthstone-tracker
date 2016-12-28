import { matchBreakdown, summaryStats, winStreak } from '../scripts/validators';
import React from 'react';
import WinStreaks from './win-streaks.jsx';
import {StatsPanel} from './stats-panel.jsx';
import MatchBreakdown from './match-breakdown.jsx';

const clearStyle = {
  clear: 'both'
};

const Main = ({
  matchBreakdown, summaryStats, winStreak
}) => (
  <div>
    <h1>Stats</h1>
    <StatsPanel data={summaryStats} />
    <h1 style={clearStyle}>Win Streak</h1>
    <WinStreaks data={winStreak} />
    <h1>Breakdown of matches</h1>
    <MatchBreakdown data={matchBreakdown} />
  </div>
);

Main.propTypes = {
  matchBreakdown,
  summaryStats,
  winStreak
};

export default Main;
