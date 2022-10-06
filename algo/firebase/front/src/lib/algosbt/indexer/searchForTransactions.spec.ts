import { expect } from 'chai';

import { test1Account } from '../account/accounts';
import { testNetAlgod } from '../algod/algods';
import createAsset from '../transactions/createAsset';
import destroyAsset from '../transactions/destroyAsset';
import { testNetAlgoIndexer } from './indexers';

import searchForTransactions from './searchForTransactions';

describe('searchForTransactions', () => {
  it('should work', async () => {
    const note = new TextEncoder().encode('Hello');
    const txnParams = {
      from: test1Account.addr,
      note,
      assetName: 'AAA',
    };

    const assetIndex = await createAsset(
      testNetAlgod,
      txnParams,
      test1Account.sk
    );

    try {
      console.log('Asset Index:', assetIndex);

      const txns = await searchForTransactions(testNetAlgoIndexer, assetIndex);

      expect(txns.length).to.eq(1);
      expect(Buffer.from(txns[0].note, 'base64')).to.eql(note);
    } finally {
      await destroyAsset(
        testNetAlgod,
        { from: test1Account.addr, assetIndex },
        test1Account.sk
      );
    }
  });
});
