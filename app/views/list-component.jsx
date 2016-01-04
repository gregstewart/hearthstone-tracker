'use babel';

import React from 'react';

export default class ListComponent extends React.Component {
  render() {
    var listNodes = this.props.data.map(function(element) {
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
