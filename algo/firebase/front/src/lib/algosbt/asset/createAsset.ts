import * as algosdk from 'algosdk';

import signSendWaitTxn from '../algod/signSendWaitTxn';

const createAsset = async (
  algod: algosdk.Algodv2,
  txnParams: {
    from: string;
    assetName: string;
  },
  secretKey: Uint8Array
) => {
  const { from, assetName } = txnParams;
  const suggestedParams = await algod.getTransactionParams().do();

  const txn = algosdk.makeAssetCreateTxnWithSuggestedParamsFromObject({
    from,
    total: 1,
    decimals: 0,
    defaultFrozen: true,
    manager: from,
    unitName: 'SBT',
    assetName,
    suggestedParams,
  });

  const ctx = await signSendWaitTxn(algod, txn, secretKey);

  return ctx['asset-index'];
};

export default createAsset;