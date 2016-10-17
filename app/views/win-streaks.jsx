import { winStreak as data } from '../scripts/validators';
import React from 'react';
import WinStreak from './win-streak.jsx';

const WinStreaks = ({
  data
}) => (
  <ul>
    {
      data.map((element, index) =>
        <WinStreak element={element} key={index}/>
      )
    }
  </ul>
);

WinStreaks.propTypes = {
  data
};

export default WinStreaks;
