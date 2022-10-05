import { test1Account } from '../account/accounts';
import { testNetAlgod } from '../algod/algods';
import splitIntoChunks from '../utils/splitIntoChunks';
import searchForTransactions from '../indexer/searchForTransactions';

import createAsset from './createAsset';
import destroyAsset from './destroyAsset';
import saveBatchNotes from './saveBatchNotes';
import { testNetAlgoIndexer } from '../indexer/indexers';
import { expect } from 'chai';

describe('saveBatchNotes', () => {
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

      const txns = await searchForTransactions(testNetAlgoIndexer, assetIndex);

      console.log(JSON.stringify(txns, undefined, 2));

      expect(txns.transactions.length).to.eq(17);

      (txns.transactions as Array<any>).forEach((tx) => {
        const note = tx.note;
        let i = 1;

        if (tx['tx-type'] === 'axfer') {
          expect(Uint8Array.from(Buffer.from(note, 'base64'))).to.eql(
            new Uint8Array([i++])
          );
        }
      });
    } finally {
      await destroyAsset(
        testNetAlgod,
        { from: test1Account.addr, assetIndex },
        test1Account.sk
      );
    }
  });
});
