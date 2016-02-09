import React, { Component, PropTypes } from 'react';

class Stat extends Component {
  render () {
    let element = this.props.element;
    return (
      <li>{element.label}: {element.text}</li>
    );
  }
}

Stat.propTypes = {
  element: PropTypes.shape({
    label: PropTypes.string,
    text: PropTypes.string
  })
};

export default Stat;
