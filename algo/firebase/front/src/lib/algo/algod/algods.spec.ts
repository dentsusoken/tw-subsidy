import { expect } from 'chai';

import { ChainType } from '@/lib/types';

import { mainNetAlgod, testNetAlgod, getAlgod } from './algods';

describe('algods', () => {
  it('mainNetAlgod should work', async () => {
    expect(await mainNetAlgod.status()).to.not.be.empty;
  });

  it('testNetAlgod should work', async () => {
    expect(await testNetAlgod.status()).to.not.be.empty;
  });

  it('getAlgod should work', async () => {
    expect(getAlgod(ChainType.TestNet)).to.eq(testNetAlgod);
    expect(getAlgod(ChainType.MainNet)).to.eq(mainNetAlgod);
  });
});
