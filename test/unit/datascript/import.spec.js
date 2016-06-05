import { result } from '../../fixtures/database-result';
import { mori, datascript, helpers } from 'datascript-mori';
import { expect } from 'chai';

import importer from '../../../src/datascript/import';
import { scheme } from '../../../src/datascript/scheme';

const { hashMap, isSet, parse, set, vector, get } = mori;
const { core } = datascript;
const { entities_to_clj } = helpers;

describe('Datascript importer', () => {
  let db;
  beforeEach(() => {
    db = core.empty_db(scheme);
  });

  it('captures the schema', () => {
    let dbWithData = core.db_with(db,
      entities_to_clj([
        [":db/add", 1, ":time/start", 1453420291617],
        [":db/add", 1, ":time/end", 1453420736889],
        [":db/add", 1, ":for/name", "artaios"],
        [":db/add", 1, ":for/id", 1],
        [":db/add", 1, ":for/class", "Priest"],
        [":db/add", 1, ":against/name", "zam"],
        [":db/add", 1, ":against/id", 2],
        [":db/add", 1, ":against/class", "Shamman"],
        [":db/add", 1, ":hasWon", true]
      ])
    );
    const query = `[:find ?e ?a ?end ?name ?hasWon
                    :in $ ?a
                    :where [?e ":time/end" ?end] [?e ":for/name" ?name] [?e ":hasWon" ?hasWon]
                    [?e ":time/start" ?a]]`;
    let queryResponse = core.q(parse(query), dbWithData, 1453420291617);
    expect(isSet(queryResponse)).to.be.true;
    expect(set([vector(1, 1453420291617, 1453420736889, "artaios", true)])).to.deep.equal(queryResponse);
  });

  it('imports a set of data', () => {
    let dbWithData = importer(db, result);

    const query = `[:find ?e ?n ?name ?hasWon
                    :in $ ?a
                    :where [?e ":time/end" ?n] [?e ":for/name" ?name] [?e ":hasWon" ?hasWon]
                    [?e ":time/start" ?a]]`;
    let queryResponse = core.q(parse(query), dbWithData, 1453420291617);

    expect(isSet(queryResponse)).to.be.true;
    expect(set([vector(1453420291617, 1453420736889, "artaios", true)])).to.deep.equal(queryResponse);

    queryResponse = core.q(parse(query), dbWithData, 1453420291613);

    expect(isSet(queryResponse)).to.be.true;
    expect(set([vector(1453420291613, 1453420736889, "artaios", false)])).to.deep.equal(queryResponse);
  });
});
