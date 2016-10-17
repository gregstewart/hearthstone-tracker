import { summaryStats as data } from '../scripts/validators';
import React from 'react';
import Stat from './stat.jsx';

const Stats = ({
  data
}) => (
  <ul>
    {
      data.map(element =>
        <Stat element={element} key={element.id}/>
      )
    }
  </ul>
);

Stats.propTypes = {
  data
};

export default Stats;
