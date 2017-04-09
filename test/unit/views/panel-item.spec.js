import React from 'react';
import { createRenderer } from 'react-test-renderer/shallow';

import PanelItem from '../../../app/views/panel-item.jsx';
import Stats from '../../../app/views/stats.jsx';

describe('Panel item view component', () => {
  it('renders a list of stats panels', () => {
    const statData = [{id: 1, label: 'Wins', text: '1'}, {id: 2, label: 'Loss', text: '23'}];
    const shallowRenderer = createRenderer();
    shallowRenderer.render(
      <PanelItem data={statData} label={'Today'} />
    );
    const item = shallowRenderer.getRenderOutput();

    expect(item.type).to.equal('div');
    expect(item.props.children.length).to.equal(2);
    expect(item.props.children[0].type).to.equal('h2');
    expect(item.props.children[0].props.children).to.equal('Today');
    expect(item.props.children[1].type).to.equal(Stats);
  });
});
