import { expect } from 'chai';

import { generateAccount } from 'algosdk';

import { idFromAddress, addressFromID, ID_PREFIX } from './didUtils';

describe('didUtils', () => {
  it('idFromAddress should work', () => {
    const account = generateAccount();
    const id = idFromAddress(account.addr);

    expect(id.startsWith(ID_PREFIX)).to.be.true;
  });

  it('addressFromId should work', () => {
    const account = generateAccount();
    const id = idFromAddress(account.addr);

    expect(addressFromID(id)).to.eq(account.addr);
  });
});
