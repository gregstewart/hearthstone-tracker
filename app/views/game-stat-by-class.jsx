import { gameStatsByClassElement } from '../scripts/validators';
import React from 'react';
import PropTypes from 'prop-types';

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
