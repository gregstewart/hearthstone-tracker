import React, { Component, PropTypes } from 'react';
import ListComponent from './list-component';

class Main extends Component {
  render () {
    return (
      <div>
        <h1>Stats</h1>
        <ListComponent data={this.props.stats} />
      </div>
    );
  }
}

Main.propTypes = {
  stats: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired,
    label: PropTypes.string,
    text: PropTypes.string,
    map: PropTypes.func
  }))
};

export default Main;
