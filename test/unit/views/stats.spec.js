import React from 'react';
import { createRenderer } from 'react-addons-test-utils';
import { expect } from 'chai';

import Stat from '../../../app/views/stat.jsx';
import Stats from '../../../app/views/stats.jsx';

describe('Stats list view component', () => {
  it('renders a list of stats', () => {
    const statData = [{id: 1, label: "Wins", text: "3"}, {id: 2, label: "Loss", text: "1"}];
    const shallowRenderer = createRenderer();
    shallowRenderer.render(
      <Stats data={statData} />
    );
    const item = shallowRenderer.getRenderOutput();
    expect(item.type).to.equal('ul');
    expect(item.props.children.length).to.equal(2);
  });
});
