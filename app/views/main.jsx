import { matchBreakdown, summaryStats, winStreak } from '../scripts/validators';
import React from 'react';
import Stats from './stats.jsx';
import WinStreaks from './win-streaks.jsx';
import MatchBreakdown from './match-breakdown.jsx';

const Main = ({
  matchBreakdown, summaryStats, winStreak
}) => (

  <div>
    <h1>Stats</h1>
    <div>
      <h2>Today</h2>
      <Stats data={summaryStats.today} />
    </div>
    <div>
      <h2>This week</h2>
      <Stats data={summaryStats.thisWeek} />
    </div>
    <div>
      <h2>This month</h2>
      <Stats data={summaryStats.thisMonth} />
    </div>
    <div>
      <h2>All time</h2>
      <Stats data={summaryStats.allTime} />
    </div>
    <h1>Win Streak</h1>
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
