import React from 'react';
import { createRenderer } from 'react-test-renderer/shallow';

import StatsPanel from '../../../app/views/stats-panel.jsx';
import PanelItem from '../../../app/views/panel-item.jsx';
import Stats from '../../../app/views/stats.jsx';

describe('Stats panel view component', () => {
  it('renders a list of stats panels', () => {
    const statData = {
      today: [{id: 1, label: 'Wins', text: '1'}, {id: 2, label: 'Loss', text: '23'}],
      thisWeek: [{id: 1, label: 'Wins', text: '5'}, {id: 2, label: 'Loss', text: '5'}],
      thisMonth: [{id: 1, label: 'Wins', text: '7'}, {id: 2, label: 'Loss', text: '10'}],
      allTime: [{id: 1, label: 'Wins', text: '3'}, {id: 2, label: 'Loss', text: '1'}]
    };
    const shallowRenderer = createRenderer();
    shallowRenderer.render(
      <StatsPanel data={statData} />
    );
    const item = shallowRenderer.getRenderOutput();
    expect(item.type).to.equal('div');
    expect(item.props.children.length).to.equal(4);
    expect(item.props.children[0].key).to.equal('today');
    expect(item.props.children[0].type).to.equal(PanelItem);
    expect(item.props.children[1].key).to.equal('thisWeek');
    expect(item.props.children[1].type).to.equal(PanelItem);
    expect(item.props.children[2].key).to.equal('thisMonth');
    expect(item.props.children[2].type).to.equal(PanelItem);
    expect(item.props.children[3].key).to.equal('allTime');
    expect(item.props.children[3].type).to.equal(PanelItem);

  });
});
