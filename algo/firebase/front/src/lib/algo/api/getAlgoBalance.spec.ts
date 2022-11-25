import { expect } from 'chai';

import { testNetAlgod as algod } from '../algod/algods';
import { test1Account } from '@/lib/algosbt/account/accounts';

import getAlgoBalance from './getAlgoBalance';

describe('getAlgoBalance', () => {
  it('should work', async () => {
    const balance = await getAlgoBalance(algod, test1Account.addr);

    expect(balance).to.not.be.undefined;
  });
});
