import React, { Component, PropTypes } from 'react';
import Stat from './stat';

class Stats extends Component {
  render () {
    var listNodes = this.props.stats.map((element) => {
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
  stats: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired,
    label: PropTypes.string,
    text: PropTypes.string,
    map: PropTypes.func
  }))
};

export default Stats;
