import { expect } from 'chai';

import { mainNetAlgod, testNetAlgod } from './algods';

describe('algosdkUtils', () => {
  it('mainNetAlgod should work', async () => {
    expect(await mainNetAlgod.status()).to.not.be.empty;
  });

  it('testNetAlgod should work', async () => {
    expect(await testNetAlgod.status()).to.not.be.empty;
  });
});
