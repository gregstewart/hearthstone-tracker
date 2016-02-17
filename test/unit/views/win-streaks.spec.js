import React from 'react';
import { createRenderer } from 'react-addons-test-utils';
import { expect } from 'chai';

import WinStreak from '../../../app/views/win-streak.jsx';
import WinStreaks from '../../../app/views/win-streaks.jsx';

describe('WinStreaks list view component', () => {
  it('renders a list of stats', () => {
    const statData = [
      { result: 'loss', as: 'Rogue', against: 'Rogue' },
      { result: 'win', as: 'Rogue', against: 'Mage' }
    ];
    const shallowRenderer = createRenderer();
    shallowRenderer.render(
      <WinStreaks data={statData} />
    );
    const item = shallowRenderer.getRenderOutput();
    expect(item.type).to.equal('ul');
    expect(item.props.children.length).to.equal(2);
  });
});
