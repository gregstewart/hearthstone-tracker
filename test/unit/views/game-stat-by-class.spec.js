import React from 'react';
import { createRenderer } from 'react-test-renderer/shallow';
import { expect } from 'chai';

import GameStatByClass from '../../../app/views/game-stat-by-class.jsx';

describe('GameStatByClass item view component', () => {
  it('renders the component with the correct props', () => {
    const statData = { class: 'Rogue', total: 3, percentage: '60%' };
    const shallowRenderer = createRenderer();
    shallowRenderer.render(
      <GameStatByClass element={statData} key="1" outcome="win"/>
    );
    const item = shallowRenderer.getRenderOutput();

    expect(item.type).to.equal('li');
    expect(item.props.children).to.deep.equal([ 'Rogue', ' | ', 'win', ': ', 3, ' | Percentage: ', '60%' ]);
  });
});
