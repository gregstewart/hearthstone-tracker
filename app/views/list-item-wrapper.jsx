import React from 'react';

class ListItemWrapper extends React.Component {
  render () {
    let element = this.props.element;
    return (
      <li>{element.label}: {element.text}</li>
    );
  }
}

ListItemWrapper.propTypes = {
  element: React.PropTypes.shape({
    label: React.PropTypes.string,
    text: React.PropTypes.string
  })
};

export default ListItemWrapper;
