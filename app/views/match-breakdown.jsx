import { matchBreakdown as data } from '../scripts/validators';
import React from 'react';
import GameStatsByClass from './game-stats-by-class';

const MatchBreakdown = ({
  data /* eslint no-unused-vars: 0 */
}) => (
  <ul>
    {
      data.map((element, index) =>
        <GameStatsByClass data={element} key={index}/>
      )
    }
  </ul>
);

MatchBreakdown.propTypes = {
  data
};

export default MatchBreakdown;
