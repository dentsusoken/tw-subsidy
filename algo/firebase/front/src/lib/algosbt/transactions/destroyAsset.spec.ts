import { expect } from 'chai';

import { test1Account } from '../account/accounts';
import { testNetAlgod } from '../algod/algods';
import getCreatedAsset from '../algod/getCreatedAsset';

import createAsset from './createAsset';
import destroyAsset from './destroyAsset';

describe('destroyAsset', () => {
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
    } finally {
      await destroyAsset(
        testNetAlgod,
        { from: test1Account.addr, assetIndex },
        test1Account.sk
      );
    }

    const asset = await getCreatedAsset(
      testNetAlgod,
      test1Account.addr,
      assetIndex
    );

    expect(asset).to.be.undefined;
  });
});
