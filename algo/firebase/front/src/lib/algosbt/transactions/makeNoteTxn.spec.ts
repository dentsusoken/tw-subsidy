import { expect } from 'chai';

import { test1Account } from '../account/accounts';
import { testNetAlgod } from '../algod/algods';
import signSendWaitTxn from '../algod/signSendWaitTxn';

import createAsset from './createAsset';
import destroyAsset from './destroyAsset';
import makeNoteTxn from './makeNoteTxn';

describe('makeNoteTxn', () => {
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

      const suggestedParams = await testNetAlgod.getTransactionParams().do();
      const note = new Uint8Array([0, 1]);

      const txn = makeNoteTxn({
        from: test1Account.addr,
        assetIndex,
        note,
        suggestedParams,
      });

      expect(txn).to.be.not.undefined;

      await signSendWaitTxn(testNetAlgod, txn, test1Account.sk);
    } finally {
      await destroyAsset(
        testNetAlgod,
        { from: test1Account.addr, assetIndex },
        test1Account.sk
      );
    }
  });
});
