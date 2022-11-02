import { expect } from 'chai';

import getAlgoBlance from './getAlgoBlance';
import { testNetAlgod as algod } from '../algod/algods';
import { holderAccount } from '../account/accounts';

describe('getAlgoBlance', () => {
  it('should work', async () => {
    const blance = await getAlgoBlance(algod, holderAccount.addr);

    expect(blance).to.not.be.undefined;
  });
});
