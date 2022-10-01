import { expect } from 'chai';

import { generateAccount } from 'algosdk';

import { addressFromSecretKey } from './algosdkUtils';

describe('algosdkUtils', () => {
  it('addressFromSecretKey should work', () => {
    const account = generateAccount();

    expect(addressFromSecretKey(account.sk)).to.eql(account.addr);
  });
});
