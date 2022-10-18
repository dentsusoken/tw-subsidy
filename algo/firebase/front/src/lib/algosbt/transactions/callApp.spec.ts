import { expect } from 'chai';

import algosdk from 'algosdk';

import { test1Account } from '../account/accounts';
import { testNetAlgod as algod } from '../algod/algods';
import getGlobalState from '../algod/getGlobalState';

import createRevokedApp from './createRevokedApp';
import deleteApp from './deleteApp';
import callApp from './callApp';

describe('callApp', () => {
  it('should work', async () => {
    const from = test1Account.addr;
    const appArgs = [
      new TextEncoder().encode('set_revoked'),
      algosdk.encodeUint64(1),
    ];

    const appIndex = await createRevokedApp(algod, { from }, test1Account.sk);

    try {
      console.log('Application Index:', appIndex);

      const state = await getGlobalState(algod, appIndex);

      expect(state.revoked).to.eq(0);

      await callApp(algod, { from, appIndex, appArgs }, test1Account.sk);

      const state2 = await getGlobalState(algod, appIndex);

      expect(state2.revoked).to.eq(1);
    } finally {
      await deleteApp(algod, { from, appIndex }, test1Account.sk);
    }
  });
});
