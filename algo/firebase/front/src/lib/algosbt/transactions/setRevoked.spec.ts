import { expect } from 'chai';

import { test1Account } from '../account/accounts';
import { testNetAlgod as algod } from '../algod/algods';
import getGlobalState from '../algod/getGlobalState';

import createRevokedApp from './createRevokedApp';
import deleteApp from './deleteApp';
import setRevoked from './setRevoked';

describe('setRevoked', () => {
  it('should work', async () => {
    const from = test1Account.addr;

    const appIndex = await createRevokedApp(algod, { from }, test1Account.sk);

    try {
      console.log('Application Index:', appIndex);

      const state = await getGlobalState(algod, appIndex);

      expect(state.revoked).to.eq(0);

      await setRevoked(algod, { from, appIndex, value: 1 }, test1Account.sk);

      const state2 = await getGlobalState(algod, appIndex);

      expect(state2.revoked).to.eq(1);
    } finally {
      await deleteApp(algod, { from, appIndex }, test1Account.sk);
    }
  });
});
