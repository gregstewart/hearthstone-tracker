import React from 'react';
import { createRenderer } from 'react-test-renderer/shallow';

import Main from '../../../app/views/main.jsx';
import StatsPanel from '../../../app/views/stats-panel.jsx';

describe('Main view component', () => {
  it('renders the component with the correct props', () => {
    const summaryStatData = {
      today: [{id: 1, label: 'Wins', text: '1'}, {id: 2, label: 'Loss', text: '23'}],
      thisWeek: [{id: 1, label: 'Wins', text: '5'}, {id: 2, label: 'Loss', text: '5'}],
      thisMonth: [{id: 1, label: 'Wins', text: '7'}, {id: 2, label: 'Loss', text: '10'}],
      allTime: [{id: 1, label: 'Wins', text: '3'}, {id: 2, label: 'Loss', text: '1'}]
    };
    const winStreakData = [
      { result: 'loss', as: 'Rogue', against: 'Rogue' },
      { result: 'win', as: 'Rogue', against: 'Mage' }
    ];
    const matchBreakdownData = [
      { status: 'wins',
        outcomes: [ { class: 'Rogue', total: 3, percentage: '60%' },
          { class: 'Priest', total: 1, percentage: '20%' },
          { class: 'Druid', total: 1, percentage: '20%' }
        ]},
      { status: 'losses',
        outcomes: [ { class: 'Rogue', total: 1, percentage: '50%' },
          { class: 'Warlock', total: 1, percentage: '50%' }
        ]}
    ];

    const shallowRenderer = createRenderer();
    shallowRenderer.render(
      <Main matchBreakdown={matchBreakdownData} summaryStats={summaryStatData} winStreak={winStreakData}/>
    );
    const item = shallowRenderer.getRenderOutput();
    expect(item.type).to.equal('div');

    expect(item.props.children[0].type).to.equal('h1');
    expect(item.props.children[0].props.children).to.equal('Stats');

    expect(item.props.children[1].type).to.equal(StatsPanel);

    expect(item.props.children[2].type).to.equal('h1');
    expect(item.props.children[2].props.children).to.equal('Win Streak');

    expect(item.props.children[3].props.data).to.deep.equal(winStreakData);

    expect(item.props.children[4].type).to.equal('h1');
    expect(item.props.children[4].props.children).to.equal('Breakdown of matches');

    expect(item.props.children[5].props.data).to.deep.equal(matchBreakdownData);
  });
});
