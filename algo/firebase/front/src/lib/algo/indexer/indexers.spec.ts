import { expect } from 'chai';

import { mainNetAlgoIndexer, testNetAlgoIndexer } from './indexers';

describe('indexers', () => {
  it('mainNetAlgoIndexer should work', async () => {
    expect(await mainNetAlgoIndexer.makeHealthCheck()).to.not.be.empty;
  });

  it('testNetAlgoIndexer should work', async () => {
    expect(await testNetAlgoIndexer.makeHealthCheck()).to.not.be.empty;
  });
});
