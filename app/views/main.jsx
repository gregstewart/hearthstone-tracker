import { matchBreakdown, summaryStats, winStreak } from '../scripts/validators';
import React from 'react';
import Stats from './stats.jsx';
import WinStreaks from './win-streaks.jsx';
import MatchBreakdown from './match-breakdown.jsx';

const divStyle = {
  float: 'left',
  margin: '0 20px 0 0'
};

const clearStyle = {
  clear: 'both'
}

const Main = ({
  matchBreakdown, summaryStats, winStreak
}) => (
  <div>
    <h1>Stats</h1>
    <div style={divStyle}>
      <h2>Today</h2>
      <Stats data={summaryStats.today} />
    </div>
    <div style={divStyle}>
      <h2>This week</h2>
      <Stats data={summaryStats.thisWeek} />
    </div>
    <div style={divStyle}>
      <h2>This month</h2>
      <Stats data={summaryStats.thisMonth} />
    </div>
    <div style={divStyle}>
      <h2>All time</h2>
      <Stats data={summaryStats.allTime} />
    </div>
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
