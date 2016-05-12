import { matchBreakdown, summaryStats, winStreak } from '../scripts/validators';
import React from 'react';
import Stats from './stats';
import WinStreaks from './win-streaks';
import MatchBreakdown from './match-breakdown';

const Main = ({
  matchBreakdown, summaryStats, winStreak
}) => (
  <div>
    <h1>Stats</h1>
    <Stats data={summaryStats} />
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
