import { expect } from 'chai';

import findClass from '../../src/find-class';

describe('Find class', () => {
  it('returns the class for a given hero name', () => {
    expect(findClass('Uther Lightbringer')).to.equal('Paladin');
    expect(findClass('Rexxar')).to.equal('Hunter');
    expect(findClass('Alleria Windrunner')).to.equal('Hunter');
    expect(findClass('Garrosh Hellscream')).to.equal('Warrior');
    expect(findClass('Magni Bronzebeard')).to.equal('Warrior');
    expect(findClass('Jaina Proudmoore')).to.equal('Mage');
    expect(findClass('Medivh')).to.equal('Mage');
    expect(findClass('Thrall')).to.equal('Shaman');
    expect(findClass('Anduin Wrynn')).to.equal('Priest');
    expect(findClass('Gul\'dan')).to.equal('Warlock');
    expect(findClass('Malfurion Stormrage')).to.equal('Druid');
  });
});
