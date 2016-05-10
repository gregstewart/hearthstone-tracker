import React from 'react';
import { createRenderer } from 'react-addons-test-utils';
import { expect } from 'chai';

import MatchBreakdown from '../../../app/views/match-breakdown';
import GameStatsByClass from '../../../app/views/game-stats-by-class';

describe('MatchBreakdown item view component', () => {
  it('renders the component with the correct props', () => {
    const statData = [
      { status: 'wins', outcomes: [{},{},{}]},
      { status: 'losses', outcomes: [{},{},{}]}
    ];
    const shallowRenderer = createRenderer();
    shallowRenderer.render(
      <MatchBreakdown data={statData}/>
    );
    const item = shallowRenderer.getRenderOutput();

    expect(item.type).to.equal('ul');
    expect(item.props.children.length).to.equal(2);
    expect(item.props.children[0].type).to.equal(GameStatsByClass);
    expect(item.props.children[1].type).to.equal(GameStatsByClass);
  });
});
