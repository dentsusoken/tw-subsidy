import { expect } from 'chai';

import algosdk from 'algosdk';

import { addressFromSecretKey } from './algosdkUtils';

describe('algosdkUtils', () => {
  it('addressFromSecretKey should work', () => {
    const account = algosdk.generateAccount();

    expect(addressFromSecretKey(account.sk)).to.eql(account.addr);
  });
});
