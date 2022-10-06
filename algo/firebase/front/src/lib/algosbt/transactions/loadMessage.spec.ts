import { test1Account } from '../account/accounts';
import { testNetAlgod } from '../algod/algods';
import splitIntoChunks from '../utils/splitIntoChunks';

import createAsset from './createAsset';
import destroyAsset from './destroyAsset';
import saveBatchNotes from './saveBatchNotes';
import { testNetAlgoIndexer } from '../indexer/indexers';
import { expect } from 'chai';
import loadMessage from './loadMessage';

describe('loadMessage', () => {
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

      const message = new Uint8Array(new Uint8Array(16).keys()).map(
        (i) => i + 1
      );
      const batches = splitIntoChunks(message, 1);

      await saveBatchNotes(
        testNetAlgod,
        {
          from: test1Account.addr,
          assetIndex,
          notes: batches[0],
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
