import { PropTypes } from 'react';

export const gameStatsByClassElement = PropTypes.shape({
  class: PropTypes.string,
  result: PropTypes.string,
  percentage: PropTypes.string
});

export const gameStatsByClass = PropTypes.shape({
  status: PropTypes.string,
  outcomes: PropTypes.arrayOf(gameStatsByClassElement)
});

export const matchBreakdown = PropTypes.arrayOf(gameStatsByClass);

export const statsPanel = PropTypes.shape({
  data: summaryStats
});

export const summaryStatBlock = PropTypes.arrayOf(PropTypes.shape({
  id: PropTypes.number.isRequired,
  label: PropTypes.string,
  text: PropTypes.string,
  map: PropTypes.func
}));

export const summaryStats = PropTypes.shape({
  today: summaryStatBlock,
  thisWeek: summaryStatBlock,
  thisMonth: summaryStatBlock,
  allTime: summaryStatBlock
});

export const winStreak =  PropTypes.arrayOf(PropTypes.shape({
  label: PropTypes.string,
  as: PropTypes.string,
  against: PropTypes.string,
  map: PropTypes.func
}));

export const element = PropTypes.shape({
  label: PropTypes.string,
  text: PropTypes.string
});

export const winStreakElement = PropTypes.shape({
  result: PropTypes.string,
  as: PropTypes.string,
  against: PropTypes.string
});
