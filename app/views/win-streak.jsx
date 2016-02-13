import { winStreakElement } from '../scripts/validators';
import React, { Component } from 'react';

class WinStreak extends Component {
  render () {
    let element = this.props.element;
    return (
      <li>{element.result} as {element.as} against {element.against}</li>
    );
  }
}

WinStreak.propTypes = {
  element: winStreakElement
};

export default WinStreak;
