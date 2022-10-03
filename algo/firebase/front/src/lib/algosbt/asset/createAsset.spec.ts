import { expect } from 'chai';

import { test1Account } from '../account/accounts';
import { testNetAlgod } from '../algod/algods';

import createAsset from './createAsset';
import destroyAsset from './destroyAsset';

describe('createAsset', () => {
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
    console.log('Asset Index:', assetIndex);

    await destroyAsset(
      testNetAlgod,
      { from: test1Account.addr, assetIndex },
      test1Account.sk
    );

    expect(assetIndex).to.be.gt(0);
  });
});
