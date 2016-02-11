import { PropTypes } from 'react';

export const stats = PropTypes.arrayOf(PropTypes.shape({
  id: PropTypes.number.isRequired,
  label: PropTypes.string,
  text: PropTypes.string,
  map: PropTypes.func
}));

export const winStreak =  PropTypes.arrayOf(PropTypes.shape({
  id: PropTypes.number.isRequired,
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
