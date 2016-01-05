import React from 'react';
import ListComponent from './list-component';

class Main extends React.Component {
  render () {
    return (<div><h1>Stats</h1>
      <ListComponent data={this.props.data} />
    </div>);
  }
}

Main.propTypes = {
  data: React.PropTypes.arrayOf(React.PropTypes.shape({
    id: React.PropTypes.number.isRequired,
    label: React.PropTypes.string,
    text: React.PropTypes.string,
    map: React.PropTypes.func
  }))
};

export default Main;
