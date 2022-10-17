import { expect } from 'chai';

import algosdk from 'algosdk';

import { keyPair } from '../utils/naclUtils';
import { test1Account } from '../account/accounts';
import createApp, { TxnParams } from '../transactions/createApp';
import deleteApp from '../transactions/deleteApp';
import approvalTeal from '../teal/revokedApproval.teal';
import clearTeal from '../teal/revokedClear.teal';

import { testNetAlgod as algod } from './algods';
import compile from './compile';
import getGlobalState, { formatBytesValue } from './getGlobalState';

describe('getGlobalState', () => {
  it('formatBytesValue for utf-8 should work', () => {
    const val = 'Hello';
    const b64 = Buffer.from(val).toString('base64');

    expect(formatBytesValue(b64)).to.eq(val);
  });

  it('formatBytesValue for public key should work', () => {
    const keys = keyPair();
    const b64PublicKey = Buffer.from(keys.publicKey).toString('base64');

    expect(formatBytesValue(b64PublicKey)).to.eq(
      algosdk.encodeAddress(keys.publicKey)
    );
  });

  it('formatBytesValue for binary should work', () => {
    const binary = new Uint8Array([1, 2, 3]);
    const b64Binary = Buffer.from(binary).toString('base64');

    expect(formatBytesValue(b64Binary)).to.eq(
      Buffer.from(binary).toString('utf-8')
    );
  });

  it('getGlobalState should work', async () => {
    const approvalProgram = await compile(algod, approvalTeal);
    const clearProgram = await compile(algod, clearTeal);
    const txnParams: TxnParams = {
      from: test1Account.addr,
      approvalProgram,
      clearProgram,
      numLocalInts: 0,
      numLocalByteSlices: 0,
      numGlobalInts: 1,
      numGlobalByteSlices: 0,
    };

    const appIndex = await createApp(algod, txnParams, test1Account.sk);

    try {
      console.log('Application Index:', appIndex);

      const state = await getGlobalState(algod, appIndex);
      expect(state.revoked).to.eq(0);
    } finally {
      await deleteApp(
        algod,
        { from: test1Account.addr, appIndex },
        test1Account.sk
      );
    }
  });
});
