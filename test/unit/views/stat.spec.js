import React from 'react';
import { createRenderer } from 'react-test-renderer/shallow';

import Stat from '../../../app/views/stat.jsx';

describe('Stat item view component', () => {
  it('renders the component with the correct props', () => {
    const statData = {id: 1, label: "Wins", text: "3"};
    const shallowRenderer = createRenderer();
    shallowRenderer.render(
      <Stat element={statData} key={statData.id}/>
    );
    const item = shallowRenderer.getRenderOutput();

    expect(item.type).to.equal('li');
    expect(item.props.children).to.deep.equal([ 'Wins', ': ', '3' ]);
  });
});
