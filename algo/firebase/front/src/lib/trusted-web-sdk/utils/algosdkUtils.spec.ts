import { expect } from 'chai';

import { generateAccount } from 'algosdk';

import { seedFromSecretKey } from './naclUtils';
import { accountFromSeed } from './algosdkUtils';

describe('algosdkUtils', () => {
  it('accountFromSeed should work', () => {
    const account = generateAccount();
    const seed = seedFromSecretKey(account.sk);

    expect(accountFromSeed(seed)).to.eql(account);
  });
});
