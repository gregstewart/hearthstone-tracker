'use babel';

import React from 'react';
import ListComponent from './list-component';

export default class Main extends React.Component {
  render() {
    return (<div><h1>Stats</h1>
      <ListComponent data={this.props.data} />
    </div>);
  }
}
