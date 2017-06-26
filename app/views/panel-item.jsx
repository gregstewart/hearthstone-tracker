import React from 'react';
import PropTypes from 'prop-types';
import Stats from './stats.jsx';
import { summaryStatBlock as data } from '../scripts/validators';

const divStyle = {
  float: 'left',
  margin: '0 20px 0 0'
};

const PanelItem = ({data, label}) => {
  return (
    <div style={divStyle}>
      <h2>{label}</h2>
      <Stats data={data} />
    </div>);
};

PanelItem.propTypes = {
  data: data,
  label: PropTypes.string
};

export default PanelItem;
