import { element } from '../scripts/validators';
import React from 'react';

const Stat = ({
  element
}) => (
  <li>{element.label}: {element.text}</li>
);

Stat.propTypes = {
  element
};

export default Stat;
