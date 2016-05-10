import { gameStatsByClass as data } from '../scripts/validators';
import React from 'react';
import GameStatByClass from './game-stat-by-class';

const GameStatsByClass = ({
  data /* eslint no-unused-vars: 0 */
}) => (
  <div>
    <h2>{data.status}</h2>
    <ul>
      {
        data.outcomes.map((element, index) =>
          <GameStatByClass element={element} key={index} outcome={data.status}/>
        )
      }
    </ul>
  </div>
);

GameStatsByClass.propTypes = {
  data
};

export default GameStatsByClass;
