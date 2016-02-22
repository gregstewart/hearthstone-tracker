import React from 'react';
import { createRenderer } from 'react-addons-test-utils';
import { expect } from 'chai';

import Main from '../../../app/views/main.jsx';

describe.only('Main view component', () => {
  it('renders the component with the correct props', () => {
    const summaryStatData = [{id: 1, label: "Wins", text: "3"}, {id: 2, label: "Loss", text: "1"}];
    const winStreakData = [
      { result: 'loss', as: 'Rogue', against: 'Rogue' },
      { result: 'win', as: 'Rogue', against: 'Mage' }
    ];
    const shallowRenderer = createRenderer();
    shallowRenderer.render(
      <Main summaryStats={summaryStatData} winStreak={winStreakData}/>
    );
    const item = shallowRenderer.getRenderOutput();
    
    expect(item.type).to.equal('div');
    expect(item.props.children[0].type).to.equal('h1');
    expect(item.props.children[0].props.children).to.equal('Stats');
    expect(item.props.children[1].props.data).to.deep.equal(summaryStatData);

    expect(item.props.children[2].type).to.equal('h1');
    expect(item.props.children[2].props.children).to.equal('Win Streak');
    expect(item.props.children[3].props.data).to.deep.equal(winStreakData);
  });
});
