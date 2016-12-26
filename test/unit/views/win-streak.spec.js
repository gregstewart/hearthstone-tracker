import React from 'react';
import { createRenderer } from 'react-addons-test-utils';

import WinStreak from '../../../app/views/win-streak.jsx';

describe('WinStreak item view component', () => {
  it('renders the component with the correct props', () => {
    const statData = { result: 'loss', as: 'Rogue', against: 'Rogue' };
    const shallowRenderer = createRenderer();
    shallowRenderer.render(
      <WinStreak element={statData} key={statData.id}/>
    );
    const item = shallowRenderer.getRenderOutput();

    expect(item.type).to.equal('li');
    expect(item.props.children).to.deep.equal([ 'loss', ' as ', 'Rogue', ' against ', 'Rogue' ]);
  });
});
