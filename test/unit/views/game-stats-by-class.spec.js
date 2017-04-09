import React from 'react';
import { createRenderer } from 'react-test-renderer/shallow';
import { expect } from 'chai';

import GameStatsByClass from '../../../app/views/game-stats-by-class.jsx';

describe('GameStatsByClass item view component', () => {
  it('renders the component with the correct props', () => {
    const statData = { status: 'wins',
      outcomes: [ { class: 'Rogue', total: 3, percentage: '60%' },
        { class: 'Priest', total: 1, percentage: '20%' },
        { class: 'Druid', total: 1, percentage: '20%' }
      ] };
    const shallowRenderer = createRenderer();
    shallowRenderer.render(
      <GameStatsByClass data={statData} key={1}/>
    );
    const item = shallowRenderer.getRenderOutput();

    expect(item.type).to.equal('div');
    expect(item.props.children[0].type).to.equal('h2');
    expect(item.props.children[0].props.children).to.equal('wins');
    expect(item.props.children[1].props.children.length).to.equal(3);
  });
});
