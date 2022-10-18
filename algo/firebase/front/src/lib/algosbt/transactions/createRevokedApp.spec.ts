import { expect } from 'chai';

import { test1Account } from '../account/accounts';
import { testNetAlgod as algod } from '../algod/algods';
import getGlobalState from '../algod/getGlobalState';

import deleteApp from './deleteApp';
import createRevokedApp from './createRevokedApp';

describe('createRevokedApp', () => {
  it('should work', async () => {
    const from = test1Account.addr;
    const appIndex = await createRevokedApp(algod, { from }, test1Account.sk);

    try {
      console.log('Application Index:', appIndex);

      const state = await getGlobalState(algod, appIndex);

      expect(appIndex).to.be.gt(0);
      expect(state.revoked).to.eq(0);
    } finally {
      await deleteApp(algod, { from, appIndex }, test1Account.sk);
    }
  });
});
