import { ChainType } from '@/lib/types';
import { expect } from 'chai';

import { mainNetAlgoIndexer, testNetAlgoIndexer, getIndexer } from './indexers';

describe('indexers', () => {
  it('mainNetAlgoIndexer should work', async () => {
    expect(await mainNetAlgoIndexer.makeHealthCheck()).to.not.be.empty;
  });

  it('testNetAlgoIndexer should work', async () => {
    expect(await testNetAlgoIndexer.makeHealthCheck()).to.not.be.empty;
  });

  it('getIndexer should work', async () => {
    expect(getIndexer(ChainType.TestNet)).to.eq(testNetAlgoIndexer);
    expect(getIndexer(ChainType.MainNet)).to.eq(mainNetAlgoIndexer);
  });
});
