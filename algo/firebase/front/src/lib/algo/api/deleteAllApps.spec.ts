import { expect } from 'chai';

import createRevokedApp from '@/lib/algosbt/transactions/createRevokedApp';
import deleteApp from '@/lib/algosbt/transactions/deleteApp';

import { testNetAlgod as algod } from '../algod/algods';
import { testNetAlgoIndexer as indexer } from '../indexer/indexers';
import { issuerAccount } from '../account/accounts';

import deleteAllApps, { getAppIndexes } from './deleteAllApps';

describe('deleteAllApps', () => {
  it('getAppIndexes should work', async () => {
    const from = issuerAccount.addr;
    const appIndex = await createRevokedApp(algod, { from }, issuerAccount.sk);

    try {
      expect(await getAppIndexes(indexer, issuerAccount.addr)).to.include(
        appIndex
      );
    } finally {
      await deleteApp(algod, { from, appIndex }, issuerAccount.sk);
    }
  });

  it('deleteAllApps should work', async () => {
    const from = issuerAccount.addr;
    const appIndex = await createRevokedApp(algod, { from }, issuerAccount.sk);

    try {
      expect(
        (await getAppIndexes(indexer, issuerAccount.addr)).length
      ).to.be.gt(0);

      await deleteAllApps(indexer, algod, from, issuerAccount.sk);

      expect((await getAppIndexes(indexer, issuerAccount.addr)).length).to.eq(
        0
      );
    } finally {
      const appIndexes = await getAppIndexes(indexer, issuerAccount.addr);

      if (appIndexes.indexOf(appIndex) >= 0) {
        await deleteApp(algod, { from, appIndex }, issuerAccount.sk);
      }
    }
  });
});
