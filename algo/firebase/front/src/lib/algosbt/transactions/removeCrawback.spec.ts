import { expect } from 'chai';

import { test1Account } from '../account/accounts';
import { testNetAlgod } from '../algod/algods';
import getCreatedAsset from '../algod/getCreatedAsset';

import createAsset from './createAsset';
import destroyAsset from './destroyAsset';
import removeClawback from './removeCrawback';

describe('removeClawback', () => {
  it('should work', async () => {
    const txnParams = {
      from: test1Account.addr,
      assetName: 'AAA',
    };

    const assetIndex = await createAsset(
      testNetAlgod,
      txnParams,
      test1Account.sk
    );

    try {
      console.log('Asset Index:', assetIndex);

      const asset = await getCreatedAsset(
        testNetAlgod,
        test1Account.addr,
        assetIndex
      );

      expect(asset?.params.clawback).to.not.be.undefined;

      await removeClawback(
        testNetAlgod,
        { from: test1Account.addr, assetIndex },
        test1Account.sk
      );

      const asset2 = await getCreatedAsset(
        testNetAlgod,
        test1Account.addr,
        assetIndex
      );

      expect(asset2?.params.clawback).to.be.undefined;
    } finally {
      await destroyAsset(
        testNetAlgod,
        { from: test1Account.addr, assetIndex },
        test1Account.sk
      );
    }
  });
});
