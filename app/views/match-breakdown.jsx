import { matchBreakdown as data } from '../scripts/validators';
import React from 'react';

const MatchBreakdown = ({
  data /* eslint no-unused-vars: 0 */
}) => (
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
);

MatchBreakdown.propTypes = {
  data
};

export default MatchBreakdown;
