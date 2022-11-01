import { expect } from 'chai';

import { test1Account } from '../account/accounts';

import createAsset from '../transactions/createAsset';
import destroyAsset from '../transactions/destroyAsset';
import { testNetAlgod } from './algods';
import getCreatedAsset from './getCreatedAsset';

describe('getCreatedAsset', () => {
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

      expect(asset?.index).to.not.be.null;
      expect(asset?.params).to.not.be.null;
    } finally {
      await destroyAsset(
        testNetAlgod,
        { from: test1Account.addr, assetIndex },
        test1Account.sk
      );
    }
  });
});
