import { expect } from 'chai';

import algosdk from 'algosdk';

import { test1Account } from '../account/accounts';

import { testNetAlgod } from './algods';
import signSendWaitTxn from './signSendWaitTxn';

describe('signSendWaitTxn', () => {
  it('should work', async () => {
    const suggestedParams = await testNetAlgod.getTransactionParams().do();

    const txn = algosdk.makePaymentTxnWithSuggestedParamsFromObject({
      from: test1Account.addr,
      to: test1Account.addr,
      amount: 0,
      suggestedParams,
    });

    expect(await signSendWaitTxn(testNetAlgod, txn, test1Account.sk)).to.not.be
      .empty;
  });
});
