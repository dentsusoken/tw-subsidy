import { expect } from 'chai';

import { test1Account } from '../account/accounts';
import { testNetAlgod } from '../algod/algods';
import { testNetAlgoIndexer } from '../indexer/indexers';
import { DEFAULT_CHUNK_LENGTH } from '../utils/splitIntoChunks';

import createAsset from './createAsset';
import destroyAsset from './destroyAsset';
import loadMessage from './loadMessage';
import saveMessage from './saveMessage';

describe('saveMessage', () => {
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

      const message = new Uint8Array(
        new Uint8Array(32 * DEFAULT_CHUNK_LENGTH).keys()
      ).map((i) => i + 1);

      await saveMessage(
        testNetAlgod,
        {
          from: test1Account.addr,
          assetIndex,
          message,
        },
        test1Account.sk
      );

      expect(await loadMessage(testNetAlgoIndexer, assetIndex)).to.eql(message);
    } finally {
      await destroyAsset(
        testNetAlgod,
        { from: test1Account.addr, assetIndex },
        test1Account.sk
      );
    }
  });
});
