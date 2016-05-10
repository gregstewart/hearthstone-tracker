import { gameStatsByClassElement } from '../scripts/validators';
import React, { PropTypes } from 'react';

const GameStatByClass = ({
  element,
  outcome
}) => (
  <li>{element.class} | {outcome}: {element.total} | Percentage: {element.percentage}</li>
);

GameStatByClass.propTypes = {
  element: gameStatsByClassElement,
  outcome: PropTypes.string
};

export default GameStatByClass;
