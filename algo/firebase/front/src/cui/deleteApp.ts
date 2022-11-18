import algosdk from 'algosdk';

import { issuerAccount } from '@/lib/algo/account/accounts';
import { testNetAlgod as algod } from '@/lib/algo/algod/algods';

const deleteApp = async (algod: algosdk.Algodv2, appIndex: number) => {
  console.log('Delete application:', appIndex);

  const suggestedParams = await algod.getTransactionParams().do();

  const txn = algosdk.makeApplicationDeleteTxnFromObject({
    from: issuerAccount.addr,
    appIndex,
    suggestedParams,
  });
  const stxn = txn.signTxn(issuerAccount.sk);
  const txResult = await algod.sendRawTransaction(stxn).do();
  await algosdk.waitForConfirmation(algod, txResult.txId, 10);
};

const main = async () => {
  if (process.argv.length != 3) {
    console.warn('Usage: yarn ts-node src/cui/deleteApp.ts appIndex');
    process.exit(1);
  }

  const appIndex = Number(process.argv[2]);

  await deleteApp(algod, appIndex);
};

if (require.main === module) {
  (async () => {
    await main();
    process.exit(0);
  })().catch((e) => {
    console.error(e);
    process.exit(1);
  });
}
