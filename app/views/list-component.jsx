import React from 'react';

class ListComponent extends React.Component {
  render () {
    var listNodes = this.props.data.map((element) => {
      return (
        <li key={element.id}>
          {element.label}: {element.text}
        </li>
      );
    });

    return (<ul>
      {listNodes}
    </ul>);
  }
}

ListComponent.propTypes = {
  data: React.PropTypes.shape({
    id: React.PropTypes.number.isRequired,
    label: React.PropTypes.string,
    text: React.PropTypes.string,
    map: React.PropTypes.func
  })
};

export default ListComponent;
