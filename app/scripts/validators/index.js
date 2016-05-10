import { PropTypes } from 'react';

export const matchBreakdown = PropTypes.arrayOf(PropTypes.shape({
  status: PropTypes.string,
  outcomes: PropTypes.arrayOf(PropTypes.shape({
    class: PropTypes.string,
    result: PropTypes.string,
    percentage: PropTypes.string
  }))
}));

export const GameStatsByClass = PropTypes.shape({
  status: PropTypes.string,
  outcomes: PropTypes.arrayOf(PropTypes.shape({
    class: PropTypes.string,
    result: PropTypes.string,
    percentage: PropTypes.string
  }))
});

export const summaryStats = PropTypes.arrayOf(PropTypes.shape({
  id: PropTypes.number.isRequired,
  label: PropTypes.string,
  text: PropTypes.string,
  map: PropTypes.func
}));

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
