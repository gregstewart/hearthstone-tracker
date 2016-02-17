import { winStreakElement } from '../scripts/validators';
import React from 'react';

const WinStreak = ({
  element
}) => (
  <li>{element.result} as {element.as} against {element.against}</li>
);

WinStreak.propTypes = {
  element: winStreakElement
};

export default WinStreak;
