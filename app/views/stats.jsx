import { summaryStats as data } from '../scripts/validators';
import React, { Component } from 'react';
import Stat from './stat';

class Stats extends Component {
  render () {
    var listNodes = this.props.data.map((element) => {
      return (
        <Stat element={element} key={element.id}/>
      );
    });

    return (<ul>
      {listNodes}
    </ul>);
  }
}

Stats.propTypes = {
  data
};

export default Stats;
