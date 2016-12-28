import React from 'react';
import Stats from './stats.jsx';
import { panelItem } from '../scripts/validators';

const divStyle = {
  float: 'left',
  margin: '0 20px 0 0'
};

export const PanelItem = ({data, label}) => {
  return (
    <div style={divStyle}>
    <h2>{label}</h2>
    <Stats data={data} />
  </div>);
};

PanelItem.propTypes = { panelItem };
