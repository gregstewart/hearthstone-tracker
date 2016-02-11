import { winStreak as data } from '../scripts/validators';
import React, { Component } from 'react';
import WinStreak from './win-streak';

class WinStreaks extends Component {
  render () {
    var listNodes = this.props.data.map((element) => {
      return (
        <WinStreak element={element} key={element.id}/>
      );
    });

    return (<ul>
      {listNodes}
    </ul>);
  }
}

WinStreaks.propTypes = {
  data
};

export default WinStreaks;
