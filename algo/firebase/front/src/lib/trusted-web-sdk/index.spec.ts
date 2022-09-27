import { expect } from 'chai';

import { createDid } from '.';
import { decryptSeed } from './utils/cryptUtils';
import { accountFromSeed } from './utils/algosdkUtils';
import { idFromAddress } from './utils/didUtils';

describe('trusted-web-sdk', () => {
  it('createDid should work', () => {
    const password = 'abcdefgh';
    const did = createDid(password);

    expect(did.id).to.not.be.empty;
    expect(did.encSeed).to.not.be.empty;

    const seed = decryptSeed(did.encSeed, password);
    const account = accountFromSeed(seed);

    expect(did.id).to.eq(idFromAddress(account.addr));
  });
});
