import { issuerAccount } from '@/lib/algo/account/accounts';
import { testNetAlgoIndexer as indexer } from '@/lib/algo/indexer/indexers';
import { testNetAlgod as algod } from '@/lib/algo/algod/algods';

import deleteAllApps from '@/lib/algo/api/deleteAllApps';

const main = async () => {
  if (process.argv.length != 2) {
    console.warn('Usage: yarn ts-node src/cui/deleteAllApps.ts');
    process.exit(1);
  }

  await deleteAllApps(indexer, algod, issuerAccount.addr, issuerAccount.sk);
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
