import React from 'react';
import ListItemWrapper from './list-item-wrapper';

class ListComponent extends React.Component {
  render () {
    var listNodes = this.props.data.map((element) => {
      return (
        <ListItemWrapper element={element} key={element.id}/>
      );
    });

    return (<ul>
      {listNodes}
    </ul>);
  }
}

ListComponent.propTypes = {
  data: React.PropTypes.arrayOf(React.PropTypes.shape({
    id: React.PropTypes.number.isRequired,
    label: React.PropTypes.string,
    text: React.PropTypes.string,
    map: React.PropTypes.func
  }))
};

export default ListComponent;
