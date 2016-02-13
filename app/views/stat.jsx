import { element } from '../scripts/validators';
import React, { Component } from 'react';

class Stat extends Component {
  render () {
    let element = this.props.element;
    return (
      <li>{element.label}: {element.text}</li>
    );
  }
}

Stat.propTypes = {
  element
};

export default Stat;
